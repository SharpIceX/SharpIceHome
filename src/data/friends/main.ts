interface friendsListType {
	url: string;
	title: string;
	noRounded?: boolean;
	description?: string;
	avatar?: string;
}

const avatars = import.meta.glob('./avatar/*', { eager: true, import: 'default' });
const getAvatar = (name: string) => {
	const path = `./avatar/${name}`;
	return avatars[path] as string;
};

const friendsList: friendsListType[] = [
	{
		title: '应龙笔记',
		description: '应龙笔记是一个专注于知识分享的网站',
		url: 'https://www.silverdragon.cn/',
		avatar: getAvatar('silverdragon.webp'),
	},
	{
		title: '白山白墨',
		noRounded: true,
		url: 'https://iy.ink/',
		avatar: getAvatar('iy.webp'),
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
		avatar: getAvatar('snowlyicewolf.webp'),
	},
	{
		title: '中二狐狸',
		description: '一只狐狸敲出的一个奇迹',
		url: 'https://imfurry.com/',
		avatar: getAvatar('imfurry.webp'),
	},
	{
		title: '迷失的小K',
		url: 'https://blog.kclub.tech/',
		avatar: getAvatar('kclub.webp'),
	},
	{
		title: '西西',
		url: 'https://xxand.cc/',
		avatar: getAvatar('xxand.webp'),
	},
	{
		title: '0o酱',
		noRounded: true,
		url: 'https://blog.im0o.top/',
		avatar: getAvatar('im0o.webp'),
	},
	{
		title: 'F_Qilin',
		url: 'https://blog.fqilin.top/',
		avatar: getAvatar('fqilin.webp'),
	},
	{
		title: '嗨皮',
		url: 'https://www.owk.ink/',
		avatar: getAvatar('owk.webp'),
	},
	{
		title: 'XME Notes Library',
		url: 'https://blog.xzadudu179.top/',
		avatar: getAvatar('xzadudu179.webp'),
	},
	{
		title: '洺渊',
		url: 'https://blog.fmyron.com/',
		avatar: getAvatar('fmyron.webp'),
	},
	{
		title: '黑历',
		description: '黑历の鸽子窝',
		url: 'https://heili.tech/',
		avatar: getAvatar('heili.webp'),
	},
	{
		title: '胡斯凯',
		url: 'https://hooskai.top/',
		avatar: getAvatar('hooskai.webp'),
	},
	{
		title: '渣渣120',
		url: 'https://zhazha120.cn/',
		avatar: getAvatar('zhazha120.webp'),
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
		avatar: getAvatar('xiafeng.webp'),
	},
	{
		title: '李子小大',
		description: '不正经做MC动画的，视频实验技术向',
		url: 'https://lizi-owo.xyz/',
		avatar: getAvatar('lizi-owo.webp'),
	},
	{
		title: '明宇',
		url: 'https://blog.xming.cloud/',
		avatar: getAvatar('xming.webp'),
	},
];

export { friendsList };
export type { friendsListType };
