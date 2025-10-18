<template>
	<main class="flex justify-center items-center h-full">
		<div class="grid gap-2 justify-items-center">
			<h1 class="text-4xl">404 Not Found</h1>
			<p class="text-lg">你访问的页面不存在</p>
			<NuxtLink
				to="/"
				class="flex items-center gap-3 p-4 m-2 border-rounded-xl border-nord10 border-2 hover:text-nord9 transition-colors">
				<homeIcon aria-hidden="true" />
				<span>返回首页</span>
			</NuxtLink>
		</div>
	</main>
</template>

<script setup>
import homeIcon from '@material-design-icons/svg/outlined/home.svg';

definePageMeta({
	title: '找不到页面',
});
</script>
