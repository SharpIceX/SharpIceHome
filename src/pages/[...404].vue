<template>
	<main class="flex flex-col items-center justify-center space-y-2 text-nord13">
		<h1 class="text-4xl">404 Not Found</h1>
		<p class="text-lg">你访问的页面不存在</p>
		<NuxtLink to="/" class="advanced-blur-backdrop flex items-center gap-2 p-4">
			<backArrowIcon aria-hidden="true" />
			<span>返回首页</span>
		</NuxtLink>
	</main>
</template>

<script setup>
import backArrowIcon from '@material-design-icons/svg/outlined/arrow_back.svg';

definePageMeta({
	title: '找不到页面',
});
</script>
