interface friendsListType {
	url: string;
	title: string;
	noRounded?: boolean;
	avatar?: string;
}

const avatars = import.meta.glob('./avatar/*', { eager: true, import: 'default' });
const getAvatar = (name: string) => {
	const path = `./avatar/${name}`;
	return avatars[path] as string;
};

const friendsList: friendsListType[] = [
	{
		title: '初雪·冰',
		url: 'https://wolf.snowlyicewolf.club/',
		avatar: getAvatar('snowlyicewolf.webp'),
	},
	{
		title: '洺渊',
		url: 'https://blog.fmyron.com/',
		avatar: getAvatar('fmyron.webp'),
	},
	{
		title: '0o酱',
		noRounded: true,
		url: 'https://blog.im0o.top/',
		avatar: getAvatar('im0o.webp'),
	},
	{
		title: '西西',
		url: 'https://xxand.cc/',
		avatar: getAvatar('xxand.webp'),
	},
	{
		title: '炽煋',
		url: 'https://blog.fluffycx.cn/',
	},
	{
		title: '飞羽',
		url: 'https://zoxoy.club/',
	},
	{
		title: '迷失的小K',
		url: 'https://blog.kclub.tech/',
		avatar: getAvatar('kclub.webp'),
	},
	{
		title: '夏枫',
		url: 'https://blog.mcxiafeng.top/',
		avatar: getAvatar('xiafeng.webp'),
	},
	{
		title: '胡斯凯',
		url: 'https://hooskai.top/',
		avatar: getAvatar('hooskai.webp'),
	},
	{
		title: '李子小大',
		url: 'https://lizi-owo.xyz/',
		avatar: getAvatar('lizi-owo.webp'),
	},
	{
		title: '白山白墨',
		noRounded: true,
		url: 'https://iy.ink/',
		avatar: getAvatar('iy.webp'),
	},
	{
		title: '黑历',
		url: 'https://heili.tech/',
		avatar: getAvatar('heili.webp'),
	},
	{
		title: '中二狐狸',
		url: 'https://imfurry.com/',
		avatar: getAvatar('imfurry.webp'),
	},
	{
		title: 'XME Notes Library',
		url: 'https://blog.xzadudu179.top/',
		avatar: getAvatar('xzadudu179.webp'),
	},
	{
		title: '泛泛',
		url: 'https://sothx.com/',
	},
	{
		title: '应龙笔记',
		url: 'https://www.silverdragon.cn/',
		avatar: getAvatar('silverdragon.webp'),
	},
	{
		title: 'F_Qilin',
		url: 'https://blog.fqilin.top/',
		avatar: getAvatar('fqilin.webp'),
	},
	{
		title: '渣渣120',
		url: 'https://zhazha120.cn/',
		avatar: getAvatar('zhazha120.webp'),
	},
	{
		title: '炎天',
		url: 'https://yawntee.top/',
	},
	{
		title: '明宇',
		url: 'https://blog.xming.cloud/',
		avatar: getAvatar('xming.webp'),
	},
	{
		title: '嗨皮',
		url: 'https://www.owk.ink/',
		avatar: getAvatar('owk.webp'),
	},
];

export { friendsList };
export type { friendsListType };
