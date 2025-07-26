<template>
	<!-- 背景 -->
	<AppBackground />

	<!-- 游戏推荐小组件 -->
	<GameRecommendWidgets />

	<!-- 主要内容 -->
	<div class="flex h-screen w-screen flex-col">
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

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/header.vue';
import AppBackground from './components/background.vue';
import GameRecommendWidgets from '../widgets/gameRecommend.vue';
import { useNProgress } from '@vueuse/integrations/useNProgress';

defineOptions({ name: 'App' });

const { start, done } = useNProgress();

const router = useRouter();

onMounted(() => {
	router.beforeEach((_to, _from, next) => {
		start(); // 开始加载
		next();
	});

	router.afterEach(() => {
		done(); // 加载完成
	});
});
</script>
