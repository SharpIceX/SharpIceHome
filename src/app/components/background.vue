<template>
	<div class="bg-image advanced-blur-before" aria-hidden="true"></div>
</template>

<script>
export default {
	name: 'AppBackground',
};
</script>

<style lang="less" scoped>
.bg-image::before {
	inset: 0;
	opacity: 0;
	content: '';
	z-index: -1;
	position: fixed;
	animation: bg-fade-in 1s ease-in-out forwards;
	background: url('/background.webp') center/cover no-repeat;

	@keyframes bg-fade-in {
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}
</style>
