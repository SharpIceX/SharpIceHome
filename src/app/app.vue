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
				<keep-alive :max="10">
					<component :is="Component" />
				</keep-alive>
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
