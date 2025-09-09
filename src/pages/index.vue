<template>
	<main class="flex flex-col justify-center space-y-4">
		<div
			class="advanced-blur-backdrop advanced-blur-card advanced-blur-backdrop-hover space-y-4 rounded-lg p-4 py-5 max-md:border-none">
			<!-- 个人信息 -->
			<div class="space-y-2">
				<div class="flex items-center space-x-1">
					<img src="/favicon.ico" title="SharpIce" alt="SharpIce的个人头像" width="40" height="40" />
					<h1 class="text-2xl">锐冰</h1>
				</div>
				<div class="pl-4">
					<h2 class="text-sm">Name: SharpIce</h2>
					<h3 class="text-sm">Description: 世界很大，只是我的知识有限，但我会继续学习的。</h3>
					<ul class="flex space-x-2 max-[450px]:flex-wrap max-[450px]:justify-center">
						<li class="flex items-center space-x-2">
							<favoriteBorderIcon aria-hidden="true" />
							<span>幻想生物</span>
						</li>
						<li class="flex items-center space-x-1">
							<codeIcon aria-hidden="true" />
							<span>前端开发者</span>
						</li>
						<li class="flex items-center space-x-1">
							<codeIcon aria-hidden="true" />
							<span>C#.NET</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- 关于我 -->
			<div class="space-y-2">
				<h2 class="text-xl">关于我</h2>
				<p class="pl-4">开源社区独立开发者一枚，目前正在开发一个世界观项目</p>
			</div>

			<!-- 技术栈 -->
			<div class="space-y-2">
				<h2 class="text-xl">技术栈</h2>
				<ul class="flex flex-wrap items-center space-x-2 pl-4">
					<li v-for="tech in stackList" :key="tech.name" class="flex items-center">
						<Component :is="tech.icon" class="h-5 w-5" />
						<span>{{ tech.name }}</span>
					</li>
				</ul>
			</div>

			<!-- 技术力 -->
			<div class="space-y-2">
				<ul class="flex flex-wrap items-center justify-center space-x-2 pl-4">
					<li>
						<p>我在做什么 / </p>
					</li>
					<li class="flex items-center space-x-1">
						<codeIcon aria-hidden="true" />
						<span>开发</span>
					</li>
					<li class="flex items-center space-x-1">
						<translateIcon aria-hidden="true" />
						<span>本地化</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 联系方式 -->
		<div class="flex flex-row flex-wrap justify-center space-x-4">
			<a class="link-item" href="https://blog.sharpice.top">
				<Rss_FeedIcon aria-hidden="true" />
				<span>个人博客</span>
			</a>
			<a class="link-item" href="https://github.com/SharpIceX">
				<gitubIcon aria-hidden="true" />
				<span>GitHub</span>
			</a>
			<a class="link-item" href="https://space.bilibili.com/513364639">
				<bilibiliIcon aria-hidden="true" />
				<span>哔哩哔哩</span>
			</a>
			<a class="link-item" href="https://zhihu.com/people/SharpIce">知乎</a>
			<a class="link-item" href="mailto:SharpIce@SharpIce.top">
				<emailIcon aria-hidden="true" />
				<span>邮件</span>
			</a>
		</div>
	</main>
</template>

<script setup>
import { markRaw } from 'vue';

import vueIcon from 'material-icon-theme/icons/vue.svg';
import nuxtIcon from 'material-icon-theme/icons/nuxt.svg';
import emailIcon from 'material-icon-theme/icons/email.svg';
import csharpIcon from 'material-icon-theme/icons/csharp.svg';
import nodejsIcon from 'material-icon-theme/icons/nodejs.svg';
import unocssIcon from 'material-icon-theme/icons/unocss.svg';
import javaScriptIcon from 'material-icon-theme/icons/javascript.svg';
import typeScriptIcon from 'material-icon-theme/icons/typescript.svg';
import tailwindcssIcon from 'material-icon-theme/icons/tailwindcss.svg';
import Rss_FeedIcon from '@material-design-icons/svg/round/rss_feed.svg';
import codeIcon from '@fortawesome/fontawesome-free/svgs/solid/code.svg';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import translateIcon from '@material-design-icons/svg/outlined/translate.svg';
import bilibiliIcon from '@fortawesome/fontawesome-free/svgs/brands/bilibili.svg';
import favoriteBorderIcon from '@material-design-icons/svg/round/favorite_border.svg';

const stackList = [
	{ name: 'TypeScript', icon: markRaw(typeScriptIcon) },
	{ name: 'JavaScript', icon: markRaw(javaScriptIcon) },
	{ name: 'Vue.js', icon: markRaw(vueIcon) },
	{ name: 'Nuxt', icon: markRaw(nuxtIcon) },
	{ name: 'TailwindCSS', icon: markRaw(tailwindcssIcon) },
	{ name: 'UnoCSS', icon: markRaw(unocssIcon) },
	{ name: 'Node.js', icon: markRaw(nodejsIcon) },
	{ name: 'C#.NET', icon: markRaw(csharpIcon) },
];

definePageMeta({
	title: '首页',
});
</script>

<style lang="less" scoped>
.link-item {
	@apply "flex flex-row items-center space-x-1";

	&:hover {
		@keyframes textColorChange {
			0% {
				@apply "text-nord4";
			}
			100% {
				@apply "text-nord9";
			}
		}

		animation: textColorChange 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
}
</style>
