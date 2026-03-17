import fs from 'node:fs';
import path from 'node:path';
import fontList from 'font-list';
import git from 'isomorphic-git';
import process from 'node:process';
import { defineNuxtConfig } from 'nuxt/config';

const fonts = await fontList.getFonts();
const hasFont = fonts.some((f) => f.includes('LXGW WenKai') || f.includes('霞鹜文楷'));
if (!hasFont) {
	throw new Error('系统未安装“LXGW WenKai(霞鹜文楷)”字体！');
}

const isProduction = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
	ssr: true,
	pages: true,
	telemetry: false,
	appId: 'sharpice-home',
	compatibilityDate: 'latest',
	srcDir: path.resolve(import.meta.dirname, './src'),
	buildId: await git.resolveRef({ fs, dir: import.meta.dirname, ref: 'HEAD' }),
	css: ['~/styles/main.less'],
	modules: ['nuxt-svgo', '@nuxt/eslint', '@nuxtjs/seo', '@nuxt/a11y'],
	devtools: {
		enabled: !isProduction,
	},
	build: {
		analyze: {
			analyzerMode: 'static',
		},
	},
	nitro: {
		preset: 'cloudflare-pages-static',
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: true,
		},
		publicAssets: [
			{
				baseURL: '/',
				dir: path.resolve(import.meta.dirname, './public'),
			},
		],
	},
	experimental: {
		headNext: true,
		typedPages: true,
		asyncEntry: isProduction,
		writeEarlyHints: isProduction,
		inlineRouteRules: isProduction,
	},
	future: {
		typescriptBundlerResolution: true,
	},
	features: {
		inlineStyles: true,
	},
	devServer: {
		port: 8600,
		host: '127.0.0.1',
	},
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : [],
		},
		build: {
			cssMinify: 'lightningcss',
		},
		optimizeDeps: {
			include: ['gsap', 'axe-core'],
		},
	},
	site: {
		name: '锐冰',
		currentLocale: 'zh-Hans',
		url: 'https://sharpice.top',
		description: '循此苦旅，终抵群星',
	},
	sitemap: {
		xsl: false,
		credits: false,
		zeroRuntime: true,
		minify: isProduction,
		discoverImages: false,
		discoverVideos: false,
	},
	ogImage: {
		zeroRuntime: true,
		defaults: {
			renderer: 'chromium',
		},
		compatibility: {
			prerender: {
				chromium: 'chrome-launcher',
			},
		},
	},
	seo: {
		automaticOgAndTwitterTags: true,
		redirectToCanonicalSiteUrl: true,
		meta: {
			twitterCard: 'summary_large_image',
		},
	},
	schemaOrg: {
		minify: isProduction,
		identity: {
			name: '锐冰',
			'@type': 'Person',
			url: 'https://sharpice.top',
			image: 'https://sharpice.top/favicon.png',
			sameAs: ['https://github.com/SharpIceX'],
		},
	},
	robots: {
		credits: false,
		blockAiBots: true,
		blockNonSeoBots: true,
		robotsEnabledValue: 'index, follow, noimageindex',
	},
	eslint: {
		checker: false,
		config: {
			stylistic: false,
			standalone: false,
		},
	},
	svgo: {
		dts: true,
		global: false,
		defaultImport: 'component',
	},
	app: {
		rootId: `sharpice_app`,
		head: {
			titleTemplate: '%s | 锐冰 SharpIce',
			viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
			htmlAttrs: {
				dir: 'ltr',
			},
			meta: [
				{
					name: 'keywords',
					content: 'SharpIce, 锐冰, 幻想生物, 个人网站',
				},

				// 网站主题颜色
				{
					name: 'theme-color',
					content: '#88C0D0',
				},

				// 版权信息
				{
					name: 'copyright',
					content: 'Copyright © 2020-2026 锐冰 (SharpIce). Licensed under the Mozilla Public License 2.0.',
				},

				// 作者
				{
					name: 'author',
					content: '锐冰',
				},

				// 许可证
				{
					name: 'license',
					content: 'https://www.mozilla.org/MPL/2.0/',
				},

				// 禁用浏览器扩展 Dark Reader
				{
					name: 'darkreader-lock',
				},

				// 仅提供深色模式
				{
					name: 'color-scheme',
					content: 'dark',
				},
			],

			link: [
				// 图标
				{
					rel: 'icon',
					type: 'image/x-icon',
					sizes: '256x256',
					href: '/favicon.ico',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '1024x1024',
					href: '/favicon.png',
				},
				{
					rel: 'apple-touch-icon',
					type: 'image/png',
					sizes: '256x256',
					href: '/favicon.ico',
				},
			],
		},
	},
});
