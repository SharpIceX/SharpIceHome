<template>
	<main class="flex flex-col justify-center space-y-4">
		<div
			class="advanced-blur-backdrop advanced-blur-card advanced-blur-backdrop-hover space-y-4 rounded-lg p-4 py-5 max-md:border-none">
			<!-- 个人信息 -->
			<infoComponent />

			<!-- 关于我 -->
			<aboutMeComponent />

			<!-- 技术栈 -->
			<technologyStackComponent />

			<!-- 技术力 -->
			<technicalStrengthComponent />
		</div>
		<!-- 找到我 -->
		<findMeComponent />
	</main>
</template>

<script setup>
import infoComponent from './content/info.vue';
import findMeComponent from './content/find-me.vue';
import aboutMeComponent from './content/about-me.vue';
import technologyStackComponent from './content/technology-stack.vue';
import technicalStrengthComponent from './content/technical-strength.vue';

definePageMeta({
	title: '首页',
});
</script>
