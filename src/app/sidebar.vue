<template>
	<aside class="sidebar-container" aria-label="导航">
		<ul>
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
	{ name: '游戏推荐', path: '/game' },
	{ name: '友谊连接', path: '/link' },
	{ name: '关于我', path: '/about' },
];
</script>

<style lang="less" scoped>
@import (reference) '$/nord/src/lesscss/nord.less';

.nav-link-active {
	color: @nord9;
	position: relative;
	display: inline-flex;

	&::after {
		left: 50%;
		height: 4px;
		content: '';
		bottom: -0.3rem;
		position: absolute;
		background-color: @nord9;
		transform: translateX(-50%);
		animation: width-expand 0.35s ease-in-out forwards;
	}
}

.sidebar-container {
	display: flex;
	font-size: 1.1em;
	align-items: center;
	padding: 1.5rem 4rem;

	@media (max-width: 1024px) {
		font-size: 1em;
	}

	ul {
		@apply "max-lg:flex-row";

		gap: 1.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}
</style>
