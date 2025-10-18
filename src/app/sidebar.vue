<template>
	<aside class="flex items-center px-12">
		<nav>
			<ul class="gap-6 flex flex-col">
				<li v-for="route in navRoutes" :key="route.name" class="hover:text-nord10 transition-colors">
					<NuxtLink :to="route.path" exact-active-class="nav-link-active">
						{{ route.name }}
					</NuxtLink>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup>
defineOptions({ name: 'AppSidebar' });

const navRoutes = [
	{ name: '首页', path: '/' },
	{ name: '游戏推荐', path: '/game' },
	{ name: '友谊连接', path: '/link' },
	{ name: '关于我', path: '/about' },
];
</script>

<style lang="less" scoped>
@import 'nord/src/lesscss/nord.less';

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
</style>
