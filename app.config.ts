import type { NuxtConfig } from 'nuxt/config';

export default {
	head: {
		// 屏幕适配
		viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',

		// 标题模板
		titleTemplate: '%s | 锐冰',

		htmlAttrs: {
			lang: 'zh-CN',
			dir: 'ltr',
		},

		meta: [
			// 描述
			{
				name: 'description',
				content: '世界很大，只是我的才华很有限，但我会继续学习的。',
			},
			{
				name: 'keywords',
				content: 'SharpIce, 锐冰, 幻想生物, 个人网站',
			},

			// 网站主题颜色
			{
				name: 'theme-color',
				content: '#2e3440',
			},

			// 版权信息
			{
				name: 'copyright',
				content: 'Copyright © 2024-2025 锐冰',
			},

			// 作者
			{
				name: 'author',
				content: '锐冰',
			},

			// 网站生成器
			{
				name: 'generator',
				content: 'Nuxt 4',
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
				rel: 'apple-touch-icon',
				type: 'image/png',
				sizes: '256x256',
				href: '/favicon.ico',
			},
		],
	},
} satisfies NuxtConfig['app'];
