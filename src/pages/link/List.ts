import { markRaw } from 'vue';
import type { ComponentType as SvgComponentType } from 'svg-to-vue-loader';

type LinkListType = {
	title: string;
	description: string;
	url: string;
	image?: string | Promise<string> | SvgComponentType | Promise<SvgComponentType>;
}[];

export default [
	{
		title: '白墨',
		description: '嗯',
		url: 'https://iy.ink/',
		image: (await import('./avatar/iy.webp')).default,
	},
	{
		title: '泛泛',
		description: '这里是泛泛，一枚工作了五年的Web开发工程师。时而埋头苦干，时而日常摆烂。',
		url: 'https://sothx.com/',
		image: (await import('./avatar/sothx.webp')).default,
	},
	{
		title: '绀漓',
		description: '这里是绀漓的杂货铺。看起来好像没人在这里，要不然偷一块面包？',
		url: 'https://blog.sevtinge.cc/',
		image: (await import('./avatar/sevtinge.webp')).default,
	},
	{
		title: '飞羽',
		description: '一个菜鸡的博客',
		url: 'https://zoxoy.club/',
		image: (await import('./avatar/zoxoy.webp')).default,
	},
	{
		title: '初雪·冰',
		description: '凤梨狼的小窝。',
		url: 'https://wolf.snowlyicewolf.club/',
		image: (await import('./avatar/snowlyicewolf.webp')).default,
	},
	{
		title: '中二蘑菇狐狸',
		description: '一只狐狸敲出的一个奇迹',
		url: 'https://imfurry.com/',
		image: (await import('./avatar/zebwqfox.webp')).default,
	},
	{
		title: '迷失的小K',
		description: '一同畅游代码的海洋，感受极客世界的无限可能。',
		url: 'https://blog.kclub.tech/',
		image: (await import('./avatar/kclub.webp')).default,
	},
	{
		title: '西西',
		description: '嘻嘻西西CC吸吸',
		url: 'https://xxand.cc/',
		image: (await import('./avatar/xxand.webp')).default,
	},
	{
		title: "Hello! I'm 0o酱",
		description: '光阴如梦，昨日随风',
		url: 'https://blog.im0o.top/',
		image: (await import('./avatar/im0o.webp')).default,
	},
	{
		title: 'F_Qilin',
		description: '一个小小的个人博客',
		url: 'https://blog.fqilin.top/',
		image: (await import('./avatar/fqilin.webp')).default,
	},
	{
		title: '〖天蓝〗の小窝',
		description: '这里是〖天藍〗，18岁，学生です，是Furry哦~',
		url: 'https://blog.meta1937.top/',
		image: (await import('./avatar/meta1937.webp')).default,
	},
	{
		title: '嗨皮',
		description: '憨憨',
		url: 'https://www.owk.ink/',
		image: (await import('./avatar/owk.webp')).default,
	},
	{
		title: '应龙笔记',
		description: '应龙笔记是一个专注于知识分享的网站',
		url: 'https://www.silverdragon.cn/',
		image: (await import('./avatar/silverdragon.webp')).default,
	},
	{
		title: 'XME Notes Library',
		description: 'xzadudu179的小窝',
		url: 'https://blog.xzadudu179.top/',
		image: (await import('./avatar/xzadudu179.webp')).default,
	},
	{
		title: '洺渊',
		description: '不知道写什么，那就owo一下~',
		url: 'https://blog.fmyron.com/',
		image: (await import('./avatar/fmyron.webp')).default,
	},
	{
		title: '黑历',
		description: '黑历の鸽子窝',
		url: 'https://heili.tech/',
		image: (await import('./avatar/heili.webp')).default,
	},
	{
		title: '胡斯凯',
		description: '胡斯凯的足迹',
		url: 'https://hooskai.top/',
		image: (await import('./avatar/hooskai.webp')).default,
	},
	{
		title: 'Sparrow',
		description: 'Sparrow 的小博客',
		url: 'https://blog.sparrowhe.top/',
		image: (await import('./avatar/sparrowhe.webp')).default,
	},
	{
		title: '渣渣120',
		description: '也许是一名不合格的全栈开发者',
		url: 'https://zhazha120.cn/',
		image: (await import('./avatar/zhazha120.webp')).default,
	},
	{
		title: 'FurDevsCN',
		description: '一个有态度的小动物开发团体',
		url: 'https://furdevs.cn/',
		image: markRaw(((await import('./avatar/FurDevsCN.svg')) as { default: SvgComponentType }).default),
	},
] satisfies LinkListType;
