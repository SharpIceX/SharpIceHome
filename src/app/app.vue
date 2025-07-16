<template>
	<!-- 背景 -->
	<AppBackground />

	<!-- 游戏推荐小组件 -->
	<GameRecommendWidgets />

	<!-- 主要内容 -->
	<div class="flex min-h-screen flex-col">
		<!-- 导航栏 -->
		<AppHeader />

		<!-- 主要组件 -->
		<main class="flex flex-grow items-center justify-center px-4">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<script>
import AppHeader from './components/header.vue';
import AppBackground from './components/background.vue';
import GameRecommendWidgets from '../widgets/gameRecommend.vue';

export default {
	name: 'App',
	components: {
		AppHeader,
		AppBackground,
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
</style>
