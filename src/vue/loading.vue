<template>
	<div class="flex flex-col items-center">
		<div class="loader"></div>
		<p>加载中...</p>
	</div>
</template>

<style lang="less" scoped>
/* By https://css-loaders.com/dancers/#l1 */
.loader {
	width: 40px;
	margin: 1rem;
	aspect-ratio: 1;
	position: relative;

	&:before,
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		margin: -8px 0 0 -8px;
		width: 16px;
		aspect-ratio: 1;
	}

	&:before {
		@apply bg-nord7;
		animation:
			l1-1 2s infinite,
			l1-2 0.5s infinite;
	}

	&:after {
		@apply bg-nord10;
		animation:
			l1-1 2s infinite,
			l1-2 0.5s infinite;
		animation-delay: -1s, 0s;
	}
}

@keyframes l1-1 {
	0% {
		top: 0;
		left: 0;
	}
	25% {
		top: 100%;
		left: 0;
	}
	50% {
		top: 100%;
		left: 100%;
	}
	75% {
		top: 0;
		left: 100%;
	}
	100% {
		top: 0;
		left: 0;
	}
}

@keyframes l1-2 {
	80%,
	100% {
		transform: rotate(0.5turn);
	}
}
</style>
