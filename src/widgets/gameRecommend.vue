<template>
	<a
		href="https://store.steampowered.com/app/3084280"
		target="_blank"
		class="main"
		role="button"
		itle="游戏推荐 —— 三相奇谈">
		<gamesIcon />
	</a>
</template>

<script>
import gamesIcon from '@material-design-icons/svg/outlined/games.svg';

export default {
	name: 'GameRecommend',
	components: {
		gamesIcon,
	},
};
</script>

<style lang="less" scoped>
.main {
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
