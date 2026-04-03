import YAML from 'yaml';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { joinURL, withTrailingSlash } from 'ufo';

/**
 * 匹配字符串开头可选的空白字符（空格/制表符）紧跟一个换行符
 * # 主要用于移除 Front Matter 分隔符 (---) 后的第一个换行
 */
const POST_FRONT_MATTER_NEWLINE = /^[ \t]*\r?\n/;

/**
 * 分离 Markdown 中的 Front Matter 和 正文
 * @param content Markdown 内容
 */
function splitFrontMatter(content: string): { yamlContent?: string; bodyContent: string } {
	/// 确保开头符合 Front Matter
	if (!(content.startsWith('---\n') || content.startsWith('---\r\n'))) {
		return { bodyContent: content };
	}

	// 查找闭合
	const endDelimiter = '\n---';
	const startIndex = content.indexOf('\n', 3);
	if (startIndex === -1) return { bodyContent: content };

	const endIndex = content.indexOf(endDelimiter, startIndex);

	if (endIndex === -1) {
		return { bodyContent: content };
	}

	// yaml 内容
	const yamlContent = content.slice(startIndex, endIndex).trim();

	// 正文内容
	const remainingContent = content.slice(endIndex + endDelimiter.length);
	const bodyContent = remainingContent.replace(POST_FRONT_MATTER_NEWLINE, '');

	return { yamlContent, bodyContent };
}

export { splitFrontMatter };

export default defineNuxtConfig({
	modules: ['nuxt-nexus', '@nuxtjs/mdc'],
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
				resolvePagesRoutes: (code, _id) => {
					const frontMatter = splitFrontMatter(code);

					if (frontMatter.yamlContent) return YAML.parse(frontMatter.yamlContent) as Record<string, unknown>;

					return {};
				},
				transformPage: (_code, id) => {
					const importPath = JSON.stringify(`${id}?raw`);

					return `
<template>
	<Blog :blogContent="blogContent" />
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
