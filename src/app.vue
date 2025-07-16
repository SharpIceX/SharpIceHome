<template>
	<!-- 背景 -->
	<div class="bg-image advanced-blur-before"></div>

	<!-- 游戏推荐小组件 -->
	<GameRecommendWidgets />

	<!-- 主要内容 -->
	<div class="flex flex-col min-h-screen">
		<!-- 导航栏 -->
		<header class="my-8 flex justify-center">
			<nav class="advanced-blur-backdrop">
				<ul class="flex flex-row items-center justify-center nav-link">
					<li><router-link class="nav-link" to="/">首页</router-link></li>
					<li><router-link class="nav-link" to="/project">相关项目</router-link></li>
					<li><router-link class="nav-link" to="/link">友谊链接</router-link></li>
				</ul>
			</nav>
		</header>

		<!-- 主要组件 -->
		<main class="flex-grow flex items-center justify-center px-4">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<script>
import GameRecommendWidgets from './widgets/gameRecommend.vue';

export default {
	name: 'App',
	components: {
		GameRecommendWidgets,
	},
};
</script>

<style lang="less" scoped>
/* 页面淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.7s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

/* 背景 */
.bg-image::before {
	inset: 0;
	opacity: 0;
	content: '';
	z-index: -1;
	position: fixed;
	animation: bg-fade-in 1.5s ease-in-out forwards;
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

.nav-link {
	li {
		@apply p-4;

		// 悬浮效果
		transition: color 0.3s ease;
		&:hover {
			color: theme('colors.nord10');
		}
	}
}
</style>
