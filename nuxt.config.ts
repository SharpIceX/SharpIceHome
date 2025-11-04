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
	buildId: await git.resolveRef({ fs, dir: import.meta.dirname, ref: 'HEAD' }),
	appId: 'sharpice-home',
	compatibilityDate: 'latest',
	srcDir: path.resolve(import.meta.dirname, './src'),
	modules: ['nuxt-svgo', '@unocss/nuxt', '@nuxt/eslint', '@nuxtjs/seo'],
	css: ['@/styles/main.less'],
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
		esbuild: {
			options: {
				target: 'es2022',
			},
		},
	},
	experimental: {
		headNext: isProduction,
		asyncEntry: isProduction,
		viewTransition: isProduction,
		writeEarlyHints: isProduction,
		inlineRouteRules: isProduction,
		payloadExtraction: false,
	},
	devServer: {
		port: 8600,
	},
	vite: {
		resolve: {
			preserveSymlinks: true,
		},
		build: {
			target: 'es2022',
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
