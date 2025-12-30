<template>
	<div class="h-screen w-screen flex flex-col">
		<div class="flex flex-1 overflow-hidden max-lg:flex-col">
			<AppSidebar />
			<main ref="mainElement" class="flex-1 w-full h-full overflow-auto">
				<NuxtPage :transition="{ name: 'app-up', mode: 'out-in' }" />
			</main>
		</div>
		<AppFooter class="flex-shrink-0" />
	</div>
</template>

<script lang="ts" setup>
import AppFooter from './app/footer.vue';
import AppSidebar from './app/sidebar.vue';
import { OverlayScrollbars } from 'overlayscrollbars';
import { useNProgress } from '@vueuse/integrations/useNProgress';

defineOptions({ name: 'App' });

const mainElement = ref<HTMLElement | null>(null);

if (import.meta.browser) {
	// 滚动条
	let osInstance: OverlayScrollbars | null;
	const idle =
		globalThis.requestIdleCallback || ((function_: FrameRequestCallback) => globalThis.setTimeout(function_, 1));
	idle(() => {
		if (mainElement.value) {
			osInstance = OverlayScrollbars(
				{
					target: mainElement.value,
					elements: {
						viewport: mainElement.value,
					},
				},
				{
					scrollbars: {
						autoHideDelay: 400,
						autoHide: 'scroll',
						autoHideSuspend: true,
						theme: 'os-theme-nord',
					},
				},
			);
		}
	});

	// 路由加载动画
	const router = useRouter();
	const { start, done } = useNProgress();
	router.beforeEach((_to, _from, next) => {
		start();
		next();
	});
	router.afterEach((_to, _from) => done());

	onUnmounted(() => osInstance?.destroy());
}
</script>

<style lang="less">
.app-up-enter-active,
.app-up-leave-active {
	transition:
		transform 0.3s cubic-bezier(0.55, 0, 0.1, 1),
		opacity 0.3s;
}
.app-up-enter-from,
.app-up-leave-to {
	transform: translateY(30px);
	opacity: 0;
}
.app-up-enter-to,
.app-up-leave-from {
	transform: translateY(0);
	opacity: 1;
}
</style>
