/* eslint-disable unicorn/no-await-expression-member */
import type { RequireAtLeastOne } from 'type-fest';

interface GameDataType {
	name: string;
	cover: string;

	link: RequireAtLeastOne<{
		official?: string;
		steam?: string;
		epic?: string;
	}>;
}

const GameData = [
	{
		name: 'Stray',
		cover: (await import('./assets/Stray/cover.webp')).default,

		link: {
			steam: '1332010',
		},
	},
	{
		name: 'Ori and the Blind Forest',
		cover: (await import('./assets/Ori and the Blind Forest/cover.webp')).default,

		link: {
			official: 'https://www.orithegame.com',
			steam: '261570',
		},
	},
	{
		name: 'Ori and the Will of the Wisps',
		cover: (await import('./assets/Ori and the Will of the Wisps/cover.webp')).default,

		link: {
			official: 'https://www.orithegame.com',
			steam: '1057090',
		},
	},
	{
		name: 'Spirit of the North',
		cover: (await import('./assets/Spirit of the North/cover.webp')).default,

		link: {
			steam: '1213700',
			epic: 'spirit-of-the-north-f58a66',
		},
	},
	{
		name: 'Undertale',
		cover: (await import('./assets/Undertale/cover.webp')).default,

		link: {
			official: 'https://undertale.com',
			steam: '391540',
		},
	},
	{
		name: '三相奇谈',
		cover: (await import('./assets/Threefold Recital/cover.webp')).default,

		link: {
			steam: '3084280',
		},
	},
] satisfies GameDataType[];

export { GameData };
export type { GameDataType };
