<template>
	<a
		href="https://store.steampowered.com/app/3084280/?utm_source=sharpice.top&utm_medium=referral&utm_campaign=gamerecommend"
		target="_blank"
		rel="noopener"
		class="recommend-btn"
		role="button"
		title="游戏推荐 —— 三相奇谈">
		<GamesIcon />
	</a>
</template>

<script>
import GamesIcon from '@material-design-icons/svg/outlined/games.svg';

export default {
	name: 'GameRecommend',
	components: {
		GamesIcon,
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

	&:hover {
		@apply bg-opacity-30;
		transform: scale(1.1);
		transition:
			transform 0.3s,
			background-color 0.5s;
	}
}
</style>
