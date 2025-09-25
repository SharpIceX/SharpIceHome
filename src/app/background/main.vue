<template>
	<div class="bg-image advanced-blur-before" aria-hidden="true" />
</template>

<script>
export default {
	name: 'AppBackground',
};
</script>

<style scoped>
.bg-image::before {
	inset: 0;
	opacity: 0;
	content: '';
	z-index: -1;
	position: fixed;
	animation: fade-in 0.65s ease-in-out forwards;
	background: url('./background.webp') center/cover no-repeat;
}
</style>
