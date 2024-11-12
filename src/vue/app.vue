<template>
	<div class="bg"></div>
	<Home />
</template>

<script>
import Home from './home.vue';
export default {
	components: {
		Home,
	},
};
</script>

<style lang="less" scoped>
.bg::before {
	@apply h-screen w-screen;
	@apply fixed left-0 top-0;
	content: '';
	z-index: -1;
	filter: blur(5px);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url('/public/background.webp');
	opacity: 0;
	animation: fadeIn 2s ease-in-out forwards;

	@keyframes fadeIn {
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}
</style>
