<template>
	<header class="my-8 flex justify-center">
		<nav class="advanced-blur-backdrop">
			<ul class="nav-link flex flex-row items-center justify-center">
				<li v-for="route in navRoutes" :key="route.name">
					<router-link class="nav-link" :to="route.path" exact-active-class="nav-link-active">
						{{ route.name }}
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script setup>
import { routes } from '$/router';
defineOptions({ name: 'AppHeader' });

/* * 生成导航栏数据
 * 过滤掉路径为 '/:pathMatch(.*)*' 的路由
 * 并且只保留有 meta.title 的路由
 */
const navRoutes = routes
	.filter(route => route.path !== '/:pathMatch(.*)*' && route.meta && route.meta.title)
	.map(route => ({
		name: route.meta.title,
		path: route.path,
	}));
</script>

<style lang="less" scoped>
@import 'nord/src/lesscss/nord.less';

.nav-link {
	li {
		@apply p-4;

		// 悬浮效果
		transition: color 0.3s ease;
		&:hover {
			color: @nord10;
		}
	}
}
.nav-link-active {
	@apply inline-flex items-center justify-center;

	position: relative;

	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -0.3rem;
		width: 100%;
		height: 4px;
		background-color: @nord9;

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
