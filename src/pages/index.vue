<template>
	<div class="flex justify-center items-center h-full max-lg:px-4 relative">
		<!-- 主要内容 -->
		<div class="flex flex-col gap-y-3">
			<!-- 个人信息 -->
			<div class="flex flex-col">
				<div class="flex items-center gap-x-1">
					<img src="/favicon.ico" title="SharpIce" alt="SharpIce的个人头像" class="w-10 h-10" />
					<h1 class="text-2xl">锐冰</h1>
				</div>
				<div class="pl-4">
					<h2 class="text-sm">Name: SharpIce</h2>
					<h3 class="text-sm">Description: 世界很大，只是我的知识有限，但我会继续学习的。</h3>
					<ul class="flex gap-2 flex-wrap">
						<li v-for="like in likeList" :key="like.name" class="flex items-center gap-1">
							<Component :is="like.icon" class="h-5 w-5" />
							<span>{{ like.name }}</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- 关于我 -->
			<div class="flex flex-col gap-y-2">
				<h2 class="text-xl">关于我</h2>
				<p class="pl-4">开源社区志愿者，目前正在完善架空世界观项目和尝试新技术。</p>
			</div>

			<!-- 技术栈 -->
			<div class="flex flex-col gap-y-2">
				<h2 class="text-xl">技术栈</h2>
				<ul class="flex flex-wrap max-w-3xl gap-x-2 gap-y-2 pl-4">
					<li class="flex items-center gap-x-1">
						<javaScriptIcon />
						<typeScriptIcon />
						<span>JS/TS</span>
					</li>
					<li v-for="tech in stackList" :key="tech.name" class="flex items-center gap-x-1">
						<Component :is="tech.icon" class="h-5 w-5" />
						<span>{{ tech.name }}</span>
					</li>
				</ul>
			</div>

			<!-- 技术力 -->
			<div class="flex flex-col gap-y-2">
				<ul class="flex flex-wrap items-center justify-center gap-2 pl-4">
					<li>
						<p>我在做什么 / </p>
					</li>
					<li class="flex items-center gap-1">
						<codeIcon aria-hidden="true" />
						<span>开发</span>
					</li>
					<li class="flex items-center gap-1">
						<translateIcon aria-hidden="true" />
						<span>本地化</span>
					</li>
				</ul>
			</div>

			<!-- 联系方式 -->
			<div class="flex flex-row flex-wrap justify-center gap-x-4">
				<a
					v-for="item in connectList"
					:key="item.name"
					class="link-item"
					:href="item.url"
					target="_blank"
					rel="noopener noreferrer">
					<template v-if="item.icon">
						<Component :is="item.icon" aria-hidden="true" />
					</template>
					<span>{{ item.name }}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { markRaw } from 'vue';

import vueIcon from 'material-icon-theme/icons/vue.svg';
import nuxtIcon from 'material-icon-theme/icons/nuxt.svg';
import emailIcon from 'material-icon-theme/icons/email.svg';
import archLinuxIcon from 'simple-icons/icons/archlinux.svg';
import csharpIcon from 'material-icon-theme/icons/csharp.svg';
import nodejsIcon from 'material-icon-theme/icons/nodejs.svg';
import unocssIcon from 'material-icon-theme/icons/unocss.svg';
import bookIcon from '@material-design-icons/svg/round/book.svg';
import javaScriptIcon from 'material-icon-theme/icons/javascript.svg';
import typeScriptIcon from 'material-icon-theme/icons/typescript.svg';
import tailwindcssIcon from 'material-icon-theme/icons/tailwindcss.svg';
import codeIcon from '@fortawesome/fontawesome-free/svgs/solid/code.svg';
import linuxIcon from '@fortawesome/fontawesome-free/svgs/brands/linux.svg';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import translateIcon from '@material-design-icons/svg/outlined/translate.svg';
import bilibiliIcon from '@fortawesome/fontawesome-free/svgs/brands/bilibili.svg';
import favoriteBorderIcon from '@material-design-icons/svg/round/favorite_border.svg';
import featherPointedIcon from '@fortawesome/fontawesome-free/svgs/solid/feather-pointed.svg';

definePageMeta({
	title: '首页',
	description: '循此苦旅，终抵群星',
});

const likeList = [
	{ name: '幻想生物', icon: markRaw(favoriteBorderIcon) },
	{ name: '叽叽喳喳', icon: markRaw(featherPointedIcon) },
	{ name: '架空世界观', icon: markRaw(bookIcon) },
	{ name: 'JS/TS 开发者', icon: markRaw(codeIcon) },
	{ name: 'Linux', icon: markRaw(archLinuxIcon) },
];

const stackList = [
	{ name: 'Vue.js', icon: markRaw(vueIcon) },
	{ name: 'Nuxt', icon: markRaw(nuxtIcon) },
	{ name: 'TailwindCSS', icon: markRaw(tailwindcssIcon) },
	{ name: 'UnoCSS', icon: markRaw(unocssIcon) },
	{ name: 'Node.js', icon: markRaw(nodejsIcon) },
	{ name: 'C#.NET', icon: markRaw(csharpIcon) },
	{ name: 'Linux', icon: markRaw(linuxIcon) },
];

const connectList = [
	{ name: 'GitHub', icon: markRaw(gitubIcon), url: 'https://github.com/SharpIceX' },
	{ name: '哔哩哔哩', icon: markRaw(bilibiliIcon), url: 'https://space.bilibili.com/513364639' },
	{ name: '知乎', icon: null, url: 'https://zhihu.com/people/SharpIce' },
	{ name: '邮件', icon: markRaw(emailIcon), url: 'mailto:SharpIce@SharpIce.top' },
];
</script>

<style lang="less" scoped>
.link-item {
	@apply "flex flex-row items-center gap-x-2 hover:text-nord9 transition-colors duration-300";
}

.fade-in {
	animation: fade-in 0.6s ease-in-out;
}
</style>
