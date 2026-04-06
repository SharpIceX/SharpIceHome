import fs from 'node:fs';
import path from 'node:path';
import git from 'isomorphic-git';
import process from 'node:process';
import type { pluginOptions as postcssPresetEnvOptions } from 'postcss-preset-env';

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
	alias: {
		$: path.resolve(import.meta.dirname, './node_modules'),
	},
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
				fallthrough: true,
				dir: path.resolve(import.meta.dirname, './public'),
			},
		],
	},
	typescript: {
		includeWorkspace: true,
		tsConfig: {
			compilerOptions: {
				/* 构建 */
				sourceMap: true,
				declaration: false,
				noEmitOnError: true,
				inlineSources: true,
				declarationMap: false,

				/* 检查 */
				checkJs: true,
				alwaysStrict: true,
				noImplicitAny: true,
				noUnusedLocals: true,
				strictNullChecks: true,
				noImplicitReturns: true,
				noUnusedParameters: true,
				allowUnusedLabels: false,
				strictFunctionTypes: true,
				strictBindCallApply: true,
				noImplicitUseStrict: false,
				allowUnreachableCode: false,
				exactOptionalPropertyTypes: true,
				useUnknownInCatchVariables: true,
				noFallthroughCasesInSwitch: true,
				strictPropertyInitialization: true,
				forceConsistentCasingInFileNames: true,
				noPropertyAccessFromIndexSignature: true,
			},
		},
	},
	experimental: {
		headNext: true,
		typedPages: true,
		componentIslands: true,
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
	postcss: {
		plugins: {
			autoprefixer: false,
			'postcss-preset-env': {
				stage: 1,
				features: {
					'nesting-rules': false,
					'relative-color-syntax': true,
				},
			} satisfies postcssPresetEnvOptions,
		},
	},
	linkChecker: {
		skipInspections: ['no-uppercase-chars', 'no-non-ascii-chars'],
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
			include: ['@vue/devtools-core', '@vue/devtools-kit', 'gsap'],
		},
	},
	site: {
		name: '锐冰',
		currentLocale: 'zh-Hans',
		url: 'https://sharpice.top',
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
			extension: 'png',
			component: 'fantasy',
			renderer: 'chromium',
		},
		compatibility: {
			dev: {
				chromium: 'chrome-launcher',
			},
			runtime: {
				chromium: 'chrome-launcher',
			},
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
		defaultImport: 'componentext',
		svgoConfig: {
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							removeViewBox: false,
							cleanupIds: {
								minify: true,
							},
							convertPathData: {
								forceAbsolutePath: false,
								utilizeAbsolute: false,
							},
							mergePaths: {
								floatPrecision: 2,
							},
						},
					},
				},
				'removeDimensions',
				'sortAttrs',
			],
		},
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
				// 关键词
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
	hooks: {
		// TODO !!! 修复 CJK 路径编码问题，可能在未来的 Nuxt 和 Vue 基础设施中彻底解决
		// TODO !!! 目前 CJK 全都无法正常使用
		'pages:extend': (pages) => {
			pages.forEach((page) => {
				const decoded = decodeURIComponent(page.path);
				if (decoded !== page.path) {
					if (typeof page.alias === 'string') page.alias = [page.alias];
					page.alias ||= [];
					page.alias.push(decoded);
				}
			});
		},
	},
});
