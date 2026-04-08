import path from 'node:path';
import { joinURL } from 'ufo';
import { DateTime } from 'luxon';
import git from 'isomorphic-git';
import fs from 'node:fs/promises';
import { logger } from 'nuxt/kit';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { type RouteMeta } from 'vue-router';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const gitCache = {};
const gitRootDir = path.resolve(import.meta.dirname, '../../');
/**
 * 获取文件创建和最后更新时间
 * @param filePath 文件路径
 * @returns 创建和更新后时间，采用 ISO 8601 格式，UTC+08时区
 */
async function getTimestamps(filePath: string): Promise<RouteMeta['time']> {
	const now = DateTime.now().setZone('Asia/Shanghai').toISO()!;
	const result = {
		createdAt: now,
		updatedAt: now,
	};

	const fileRelativePath = path.relative(gitRootDir, filePath);

	try {
		const status = await git.status({
			fs,
			dir: gitRootDir,
			cache: gitCache,
			filepath: fileRelativePath,
		});

		// absent: 未跟踪
		// added: 已暂存但未提交
		if (status === 'absent' || status === 'added') {
			return result;
		}

		const commits = await git.log({
			fs,
			follow: true,
			dir: gitRootDir,
			cache: gitCache,
			filepath: fileRelativePath,
		});

		if (commits && commits.length > 0) {
			// 获取最后一次提交时间 (更新时间)
			const latestCommit = commits[0];
			if (latestCommit?.commit.author.timestamp) {
				result.updatedAt = DateTime.fromSeconds(latestCommit.commit.author.timestamp)
					.setZone('Asia/Shanghai')
					.toISO()!;
			}

			// 获取创建时间
			const firstCommit = commits.at(-1);
			if (firstCommit?.commit.author.timestamp) {
				result.createdAt = DateTime.fromSeconds(firstCommit.commit.author.timestamp)
					.setZone('Asia/Shanghai')
					.toISO()!;
			}

			// 如果有本地未提交的改动，则更新时间设为当前
			if (status !== 'unmodified') {
				result.updatedAt = now;
			}
		}
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : String(error);

		if (message.includes('Could not find file')) {
			logger.warn(`文件“${fileRelativePath}”暂无 Git 提交记录`);
		} else {
			logger.error(`从 Git 读取文件“${fileRelativePath}”时间戳失败 :\n ${message}`);
		}
	}

	return result;
}

export default defineNuxtConfig({
	css: [path.resolve(import.meta.dirname, './styles/main.less')],
	modules: ['nuxt-nexus', '@nuxtjs/mdc'],
	mdc: {
		remarkPlugins: {
			'remark-cjk-friendly': {},
			'remark-cjk-friendly-gfm-strikethrough': {},
		},
		highlight: {
			theme: 'nord',
			wrapperStyle: true,
		},
		components: {
			map: {
				pre: 'BlogContentPre',
			},
		},
	},
	components: [
		{
			global: true,
			prefix: 'Blog',
			path: './components',
		},
	],
	nitro: {
		publicAssets: [
			{
				baseURL: '/blog',
				fallthrough: true,
				dir: path.resolve(import.meta.dirname, './pages'),
			},
		],
	},
	vite: {
		optimizeDeps: {
			include: [
				// # Start @nuxtjs/mdc
				'yaml',
				'@nuxtjs/mdc > remark-mdc > yaml',
				// # End @nuxtjs/mdc

				'remark-emoji',
				'remark-cjk-friendly',
				'remark-cjk-friendly-gfm-strikethrough',
			],
		},
	},
	hooks: {
		'pages:resolved': (pages) => {
			const layerDir = fileURLToPath(new URL('.', import.meta.url));

			pages.forEach((page) => {
				if (page.file?.startsWith(layerDir)) {
					if (!page.path.startsWith('/blog')) {
						page.path = joinURL('/blog', page.path);
					}
				}
			});
		},
		// TODO 此处使用暴力的方式删除 dist 内的 `*.mdc` 文件，后续如果可以的话需要优化改进
		async close(nuxt) {
			const isGenerate = process.env.npm_lifecycle_event === 'generate' || process.env.NUXT_GENERATE;
			if (!isGenerate) return;

			const distPath = path.resolve(nuxt.options.rootDir, 'dist');
			try {
				const files = [];
				for await (const entry of fs.glob('**/*.mdc', { cwd: distPath })) {
					files.push(path.resolve(distPath, entry));
				}

				if (files.length > 0) {
					await Promise.all(files.map((file) => fs.unlink(file)));
				}
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				console.warn('Cleanup skipped or failed:', message);
			}
		},
	},
	nexus: {
		loader: [
			{
				extensions: 'mdc',
				resolvePagesRoutes: async (code, id) => {
					const filePath = id.split('?')[0] || id;
					const render = await parseMarkdown(code);

					return {
						mode: 'server',
						...render.data,
						type: 'blog',
						time: await getTimestamps(filePath),
						tags: [].concat(render.data.tags || []),
					};
				},
				transformPage: (_code, id) => {
					const importPath = JSON.stringify(`${id}?raw`);

					return `
<template>
	<BlogMain :blogContent="blogContent" :meta="$route.meta" />
</template>

<script setup>
import blogContent from ${importPath};
</script>
`;
				},
			},
		],
	},
});
