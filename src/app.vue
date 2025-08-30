<template>
	<ClientOnly>
		<AppBackground />
	</ClientOnly>
	<div class="h-screen w-screen flex flex-col">
		<AppHeader />
		<main class="flex justify-center flex-1">
			<NuxtPage />
		</main>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './app/header.vue';
import AppBackground from './app/background/main.vue';
import { OverlayScrollbars } from 'overlayscrollbars';
import { useNProgress } from '@vueuse/integrations/useNProgress';

defineOptions({ name: 'App' });

if (import.meta.browser) {
	// 滚动条样式
	requestIdleCallback(() => {
		OverlayScrollbars(document.body, {
			scrollbars: {
				autoHideDelay: 400,
				autoHide: 'scroll',
				autoHideSuspend: true,
				theme: 'os-theme-nord',
			},
		});
	});

	// 加载动画
	const router = useRouter();
	const { start, done } = useNProgress();
	onMounted(() => {
		router.beforeEach((_to, _from, next) => {
			start(); // 开始加载
			next();
		});

		router.afterEach(() => {
			done(); // 加载完成
		});
	});
}
</script>
