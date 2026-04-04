import path from 'node:path';
import git from 'isomorphic-git';
import fs from 'node:fs/promises';
import { logger } from 'nuxt/kit';
import { fileURLToPath } from 'node:url';
import { type RouteMeta } from 'vue-router';
import { joinURL, withTrailingSlash } from 'ufo';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

/**
 * 格式化时间戳为：yyyy年M月d日 H时m分s秒
 */
function formatTimestamp(dateInput: number | Date): string {
	const date = typeof dateInput === 'number' ? new Date(dateInput * 1000) : dateInput;

	const opts: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false,
	};

	const parts = new Intl.DateTimeFormat('zh-CN', opts).formatToParts(date);
	const m: Record<string, string> = {};
	parts.forEach((p) => (m[p.type] = p.value));

	return `${m.year}-${m.month}-${m.day} ${m.hour}:${m.minute}`;
}

const gitCache = {};
const gitRootDir = path.resolve(import.meta.dirname, '../../');
/**
 * 获取文件创建和最后更新时间
 * @param filePath 文件路径
 * @returns 创建和更新后时间
 */
async function getTimestamps(filePath: string): Promise<RouteMeta['time']> {
	const now = formatTimestamp(new Date());
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
			// 获取创建时间（最后一次提交记录）
			const firstCommit = commits.at(-1);
			if (firstCommit?.commit.author.timestamp) {
				result.createdAt = formatTimestamp(firstCommit.commit.author.timestamp);
			}

			// 如果文件没有本地修改，则更新时间取自最新的 commit
			if (status === 'unmodified') {
				const latestCommit = commits[0];
				if (latestCommit?.commit.author.timestamp) {
					result.updatedAt = formatTimestamp(latestCommit.commit.author.timestamp);
				}
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
		// TODO ! 要过滤掉`.mdc`文件
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
		'pages:extend': (pages) => {
			const layerDir = fileURLToPath(new URL('.', import.meta.url));
			pages.forEach((page) => {
				if (page.file?.startsWith(layerDir)) {
					const joined = withTrailingSlash(joinURL('/blog', page.path));
					page.alias = joined;
					page.path = decodeURI(joined);
				}
			});
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
						...render.data,
						time: await getTimestamps(filePath),
					};
				},
				transformPage: (_code, id) => {
					const importPath = JSON.stringify(`${id}?raw`);

					return `
<template>
	<BlogMain :blogContent="blogContent" />
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
