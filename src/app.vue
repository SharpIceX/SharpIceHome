<template>
	<AppCursor />
	<div class="app-container">
		<AppSidebar />
		<main>
			<NuxtPage :transition="{ name: 'page-fade', mode: 'out-in' }" />
		</main>
	</div>
	<AppFooter />
</template>

<script lang="ts" setup>
import AppCursor from './app/cursor.vue';
import AppFooter from './app/footer.vue';
import AppSidebar from './app/sidebar.vue';

defineOptions({ name: 'App' });
defineOgImage({
	component: 'fantasy',
});

useHead({
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '1024x1024',
			href: '/favicon.png',
		},
	],
});
</script>

<style lang="less">
#sharpice_app {
	display: flex;
	height: 100dvh;
	isolation: isolate;
	position: relative;
	flex-direction: column;
}

// # 页面切换动效
.page-fade-enter-active,
.page-fade-leave-active {
	transition: opacity 0.3s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
	opacity: 0;
}
</style>

<style lang="less" scoped>
.app-container {
	flex: 1;
	min-height: 0;
	display: flex;

	// # 小屏幕
	@media (max-width: 1024px) {
		flex-direction: column;
	}
}

main {
	flex: -1;
	opacity: 0;
	width: 100%;
	overflow: auto;
	animation: slide-up-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards;
}
</style>
