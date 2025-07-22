<template>
	<div class="space-y-2">
		<h2 class="text-xl">技术栈</h2>
		<ul class="flex flex-wrap items-center space-x-2 pl-4">
			<li v-for="tech in stack" :key="tech.name" class="flex items-center">
				<Component :is="tech.icon" class="h-5 w-5" />
				<span>{{ tech.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { markRaw } from 'vue';
import vueIcon from 'material-icon-theme/icons/vue.svg';
import nuxtIcon from 'material-icon-theme/icons/nuxt.svg';
import csharpIcon from 'material-icon-theme/icons/csharp.svg';
import nodejsIcon from 'material-icon-theme/icons/nodejs.svg';
import unocssIcon from 'material-icon-theme/icons/unocss.svg';
import javaScriptIcon from 'material-icon-theme/icons/javascript.svg';
import typeScriptIcon from 'material-icon-theme/icons/typescript.svg';
import tailwindcssIcon from 'material-icon-theme/icons/tailwindcss.svg';

export default {
	name: 'TechnologyStackComponent',
	data() {
		return {
			stack: [
				{ name: 'TypeScript', icon: markRaw(typeScriptIcon) },
				{ name: 'JavaScript', icon: markRaw(javaScriptIcon) },
				{ name: 'Vue.js', icon: markRaw(vueIcon) },
				{ name: 'Nuxt', icon: markRaw(nuxtIcon) },
				{ name: 'TailwindCSS', icon: markRaw(tailwindcssIcon) },
				{ name: 'UnoCSS', icon: markRaw(unocssIcon) },
				{ name: 'Node.js', icon: markRaw(nodejsIcon) },
				{ name: 'C#.NET', icon: markRaw(csharpIcon) },
			],
		};
	},
};
</script>
