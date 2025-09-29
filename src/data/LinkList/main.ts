/* eslint-disable unicorn/no-await-expression-member */

interface LinkType {
	url: string;
	title: string;
	noRounded?: boolean;
	description?: string;
	image?: string | Promise<string>;
}

const LinkLists = [
	{
		title: '白山白墨',
		noRounded: true,
		url: 'https://iy.ink/',
		image: (await import('./avatar/iy.webp')).default,
	},
	{
		title: '泛泛',
		url: 'https://sothx.com/',
	},
	{
		title: '飞羽',
		description: '一个菜鸡的博客',
		url: 'https://zoxoy.club/',
	},
	{
		title: '初雪·冰',
		url: 'https://wolf.snowlyicewolf.club/',
		image: (await import('./avatar/snowlyicewolf.webp')).default,
	},
	{
		title: '中二狐狸',
		description: '一只狐狸敲出的一个奇迹',
		url: 'https://imfurry.com/',
		image: (await import('./avatar/imfurry.webp')).default,
	},
	{
		title: '迷失的小K',
		url: 'https://blog.kclub.tech/',
		image: (await import('./avatar/kclub.webp')).default,
	},
	{
		title: '西西',
		url: 'https://xxand.cc/',
		image: (await import('./avatar/xxand.webp')).default,
	},
	{
		title: '0o酱',
		noRounded: true,
		url: 'https://blog.im0o.top/',
		image: (await import('./avatar/im0o.webp')).default,
	},
	{
		title: 'F_Qilin',
		url: 'https://blog.fqilin.top/',
		image: (await import('./avatar/fqilin.webp')).default,
	},
	{
		title: '嗨皮',
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
		url: 'https://blog.xzadudu179.top/',
		image: (await import('./avatar/xzadudu179.webp')).default,
	},
	{
		title: '洺渊',
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
		url: 'https://hooskai.top/',
		image: (await import('./avatar/hooskai.webp')).default,
	},
	{
		title: '渣渣120',
		description: '也许是一名不合格的全栈开发者',
		url: 'https://zhazha120.cn/',
		image: (await import('./avatar/zhazha120.webp')).default,
	},
	{
		title: '炎天',
		description: '如燎原之火，燃我心海；似璀璨星辰，映照苍穹。',
		url: 'https://yawntee.top/',
	},
	{
		title: '炽煋',
		url: 'https://blog.fluffycx.cn/',
	},
	{
		title: '夏枫',
		description: '一只会敲代码的笨笨猫咪',
		url: 'https://blog.mcxiafeng.top/',
		image: (await import('./avatar/xiafeng.webp')).default,
	},
] satisfies LinkType[];

export { LinkLists };
