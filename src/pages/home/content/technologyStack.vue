<template>
	<div class="space-y-2">
		<h2 class="text-xl">技术栈</h2>
		<ul class="flex flex-wrap items-center space-x-1 pl-4">
			<li class="flex items-center space-x-1">
				<typeScriptIcon aria-hidden="true" />
				<span>TypeScript</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<javaScriptIcon aria-hidden="true" />
				<span>JavaScript</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<vueIcon aria-hidden="true" />
				<span>Vue.js</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<tailwindcssIcon aria-hidden="true" />
				<span>TailwindCSS</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<unocssIcon aria-hidden="true" />
				<span>UnoCSS</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<nodejsIcon aria-hidden="true" />
				<span>Node.js</span>
			</li>
			<li class="separation" aria-hidden="true"></li>
			<li class="flex items-center space-x-1">
				<csharpIcon aria-hidden="true" />
				<span>C#.NET</span>
			</li>
		</ul>
	</div>
</template>

<script>
import vueIcon from 'material-icon-theme/icons/vue.svg';
import csharpIcon from 'material-icon-theme/icons/csharp.svg';
import nodejsIcon from 'material-icon-theme/icons/nodejs.svg';
import unocssIcon from 'material-icon-theme/icons/unocss.svg';
import javaScriptIcon from 'material-icon-theme/icons/javascript.svg';
import typeScriptIcon from 'material-icon-theme/icons/typescript.svg';
import tailwindcssIcon from 'material-icon-theme/icons/tailwindcss.svg';

export default {
	name: 'TechnologyStackComponent',
	components: {
		vueIcon,
		unocssIcon,
		csharpIcon,
		nodejsIcon,
		javaScriptIcon,
		typeScriptIcon,
		tailwindcssIcon,
	},
};
</script>
