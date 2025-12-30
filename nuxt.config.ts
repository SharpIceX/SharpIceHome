import fs from 'node:fs';
import path from 'node:path';
import git from 'isomorphic-git';
import appConfig from './app.config';
import { defineNuxtConfig } from 'nuxt/config';

const isProduction = process.env['NODE_ENV'] === 'production';

export default defineNuxtConfig({
	ssr: true,
	pages: true,
	app: appConfig,
	telemetry: false,
	appId: 'sharpice-home',
	compatibilityDate: 'latest',
	srcDir: path.resolve(import.meta.dirname, './src'),
	buildId: await git.resolveRef({ fs, dir: import.meta.dirname, ref: 'HEAD' }),
	modules: ['nuxt-svgo', '@unocss/nuxt', '@nuxt/eslint', '@nuxtjs/seo'],
	css: ['@/styles/main.less'],
	devtools: {
		enabled: !isProduction,
	},
	alias: {
		'@': path.resolve(import.meta.dirname, './src'),
		$: path.resolve(import.meta.dirname, './node_modules'),
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
		payloadExtraction: false,
		asyncEntry: isProduction,
		writeEarlyHints: isProduction,
		inlineRouteRules: isProduction,
	},
	future: {
		typescriptBundlerResolution: false,
	},
	features: {
		inlineStyles: true,
	},
	devServer: {
		port: 8600,
	},
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
		esbuild: {
			drop: isProduction ? ['console', 'debugger'] : [],
		},
	},
	unocss: {
		nuxtLayers: true,
	},
	site: {
		name: '锐冰',
		currentLocale: appConfig.head.htmlAttrs.lang,
		description: appConfig.head.meta.find(
			(meta: { name?: string; content?: string }) => meta.name === 'description',
		)?.content,
		url: 'https://sharpice.top',
	},
	sitemap: {
		zeroRuntime: true,
		discoverImages: false,
	},
	eslint: {
		checker: false,
	},
	svgo: {
		dts: true,
		global: false,
		defaultImport: 'component',
	},
});
