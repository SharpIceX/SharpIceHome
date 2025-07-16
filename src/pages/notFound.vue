<template>
	<main class="flex flex-col items-center space-y-2 text-nord8">
		<h1 class="text-4xl">404 Not Found</h1>
		<p class="text-lg">你访问的页面不存在</p>
		<router-link to="/" class="advanced-blur-backdrop flex items-center gap-2 p-4">
			<backArrowIcon aria-hidden="true" />
			<span>返回首页</span>
		</router-link>
	</main>
</template>

<script>
import backArrowIcon from '@material-design-icons/svg/outlined/arrow_back.svg';

export default {
	name: 'NotFound',
	components: {
		backArrowIcon,
	},
};
</script>
