<template>
	<header class="w-full grid justify-center py-4">
		<nav class="advanced-blur-backdrop">
			<ul class="nav-link">
				<li v-for="route in navRoutes" :key="route.name">
					<NuxtLink :to="route.path" exact-active-class="nav-link-active">
						{{ route.name }}
					</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
defineOptions({ name: 'AppHeader' });

const navRoutes = [
	{ name: '首页', path: '/' },
	{ name: '友谊连接', path: '/link' },
	{ name: '关于我', path: '/about' },
];
</script>

<style lang="less" scoped>
@import 'nord/src/lesscss/nord.less';

.nav-link {
	gap: 0.5rem;
	display: grid;
	grid-auto-flow: column;

	li {
		@apply "p-4";

		// 悬浮效果
		transition: color 0.25s ease;
		&:hover {
			color: @nord10;
		}
	}
}
.nav-link-active {
	position: relative;
	display: inline-grid;

	&::after {
		left: 50%;
		height: 4px;
		content: '';
		bottom: -0.3rem;
		position: absolute;
		background-color: @nord9;
		transform: translateX(-50%);

		animation: nav-link-active 0.5s ease-in-out forwards;
		@keyframes nav-link-active {
			from {
				width: 0;
			}
			to {
				width: 100%;
			}
		}
	}
}
</style>
