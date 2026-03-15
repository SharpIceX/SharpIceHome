<template>
	<aside class="sidebar-container" aria-label="导航">
		<ul class="nav">
			<li v-for="route in navRoutes" :key="route.name">
				<NuxtLink :to="route.path" exact-active-class="nav-link-active">
					{{ route.name }}
				</NuxtLink>
			</li>
		</ul>
	</aside>
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppSidebar' });

const navRoutes: { name: string; path: string }[] = [
	{ name: '首页', path: '/' },
	{ name: '朋友们', path: '/friends' },
];
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.sidebar-container {
	width: 7.5%;
	padding: 1rem;
	flex-shrink: 0;
	user-select: none;
	border-right: 1px solid @fantasy-line-dim;

	.nav {
		gap: 2rem;
		padding: 0;
		width: 100%;
		display: flex;
		list-style-type: none;
		padding-bottom: 1.5rem;
		flex-direction: column;
		border-bottom: 1px solid @fantasy-line-dim;

		li {
			margin: 0 auto;
		}
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 100%;
		font-size: 1rem;
		margin-right: 0;
		border-right: none;
		padding-block: 0.3rem;
		border-bottom: 1px solid @fantasy-line-dim;

		.nav {
			padding: 0;
			border: none;
			flex-direction: row;
			justify-content: center;

			li {
				margin: 0;
			}
		}
	}
}

.nav-link-active {
	position: relative;
	color: @fantasy-accent;
	transition: all 0.3s ease;
	text-shadow: @fantasy-glow-text;

	&::after {
		left: 50%;
		content: '';
		height: 3.5px;
		bottom: -0.5rem;
		position: absolute;
		border-radius: 2px;
		transform: translateX(-50%);
		background-color: @fantasy-accent;
		box-shadow: 0 0 8px @fantasy-glow-color;
		animation: width-expand 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
	}
}
</style>
