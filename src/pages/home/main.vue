<template>
	<main class="flex flex-col justify-center space-y-4">
		<div
			class="advanced-blur-backdrop advanced-blur-card space-y-4 rounded-lg p-4 max-md:border-none advanced-blur-backdrop-hover">
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

<script>
import infoComponent from './content/info.vue';
import findMeComponent from './content/findMe.vue';
import aboutMeComponent from './content/aboutMe.vue';
import technologyStackComponent from './content/technologyStack.vue';
import technicalStrengthComponent from './content/technicalStrength.vue';

export default {
	name: 'HomePages',
	components: {
		infoComponent,
		findMeComponent,
		aboutMeComponent,
		technologyStackComponent,
		technicalStrengthComponent,
	},
};
</script>
