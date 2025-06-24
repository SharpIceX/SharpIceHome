<template>
	<button
		class="recommend-btn"
		title="游戏推荐 — 三相奇谈"
		aria-label="打开三相奇谈游戏的 Steam 页面"
		@click="openGameLink">
		<GamesIcon />
	</button>
</template>

<script>
import GamesIcon from '@material-design-icons/svg/outlined/games.svg';

export default {
	name: 'GameRecommend',
	components: {
		GamesIcon,
	},
	methods: {
		openGameLink() {
			window.open(
				'https://store.steampowered.com/app/3084280/?utm_source=sharpice.top&utm_medium=referral&utm_campaign=gamerecommend',
				'_blank',
				'noopener,noreferrer',
			);
		},
	},
};
</script>

<style lang="less" scoped>
.recommend-btn {
	/* 固定右上角 */
	top: 0;
	right: 0;
	margin: 1rem;
	position: fixed;

	@apply text-nord10;

	padding: 0.5rem;
	border-radius: 100%;
	backdrop-filter: blur(10px);
	@apply bg-nord6 bg-opacity-20;

	transition:
		transform 0.3s ease,
		background-color 0.5s ease;
	&:hover {
		@apply bg-opacity-30;
		transform: scale(1.1);
	}
}
</style>
