<template>
	<div class="opacity-animation flex flex-col justify-center space-y-4">
		<div class="card-bg space-y-4 rounded-lg border border-nord1 p-4 max-md:border-none">
			<!-- 个人信息 -->
			<div class="paragraph">
				<div class="flex items-center space-x-1">
					<img src="/favicon.webp" title="SharpIce" width="40" height="40" />
					<h1 class="text-3xl">锐冰</h1>
				</div>
				<div class="pl-4">
					<h2 class="text-sm">Name: SharpIce</h2>
					<h3 class="text-sm">Description: 世界很大，只是我的才华很有限，但我会继续学习的。</h3>
					<div class="flex space-x-2">
						<p class="flex items-center space-x-1">
							<favoriteBorderIcon />
							<span>幻想生物</span>
						</p>
						<i class="separation"></i>
						<p class="flex items-center space-x-1">
							<codeIocn />
							<span>前端开发者</span>
						</p>
						<i class="separation"></i>
						<p class="flex items-center space-x-1">
							<codeIocn />
							<span>C#.NET</span>
						</p>
					</div>
				</div>
			</div>

			<!-- 关于我 -->
			<div class="paragraph">
				<h1 class="text-2xl">关于我</h1>
				<p class="pl-4">小鸽子一枚。喜欢前端开发，偶尔接触一下后端或者桌面开发~</p>
			</div>

			<!-- 技术栈 -->
			<div class="paragraph">
				<h1 class="text-2xl">技术栈</h1>
				<div class="flex flex-wrap items-center space-x-1 pl-4">
					<p class="flex items-center space-x-1">
						<javaScriptIcon />
						<span>JavaScript</span>
					</p>
					<i class="separation"></i>
					<p class="flex items-center space-x-1">
						<typeScriptIcon />
						<span>TypeScript</span>
					</p>
					<i class="separation"></i>
					<p class="flex items-center space-x-1">
						<vueIocn />
						<span>Vue.js</span>
					</p>
					<i class="separation"></i>
					<p class="flex items-center space-x-1">
						<tailwindcssIcon />
						<span>Tailwindcss</span>
					</p>
					<i class="separation"></i>
					<p class="flex items-center space-x-1">
						<nodejsIocn />
						<span>Node.js</span>
					</p>
					<i class="separation"></i>
					<p class="flex items-center space-x-1">
						<csharpIcon />
						<span>C#.NET</span>
					</p>
				</div>
			</div>
		</div>
		<div class="centered-flex-row">
			<a class="link" href="https://blog.sharpice.top">
				<Rss_FeedIcon />
				<span>个人博客</span>
			</a>
			<a class="link" href="https://github.com/FurryRbl">
				<gitubIcon />
				<span>GitHub</span>
			</a>
			<a class="link" href="https://space.bilibili.com/513364639">
				<bilibiliIcon />
				<span>Bilibili</span>
			</a>
			<a class="link" href="https://zhihu.com/people/SharpIce">知乎</a>
			<a class="link" href="mailto:SharpIce@SharpIce.top">
				<emailIcon />
				<span>邮件</span>
			</a>
		</div>
	</div>
</template>

<script>
import vueIocn from 'material-icon-theme/icons/vue.svg';
import emailIcon from 'material-icon-theme/icons/email.svg';
import csharpIcon from 'material-icon-theme/icons/csharp.svg';
import nodejsIocn from 'material-icon-theme/icons/nodejs.svg';
import codeIocn from '@material-design-icons/svg/round/code.svg';
import javaScriptIcon from 'material-icon-theme/icons/javascript.svg';
import typeScriptIcon from 'material-icon-theme/icons/typescript.svg';
import tailwindcssIcon from 'material-icon-theme/icons/tailwindcss.svg';
import Rss_FeedIcon from '@material-design-icons/svg/round/rss_feed.svg';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import bilibiliIcon from '@fortawesome/fontawesome-free/svgs/brands/bilibili.svg';
import favoriteBorderIcon from '@material-design-icons/svg/round/favorite_border.svg';

export default {
	components: {
		vueIocn,
		codeIocn,
		emailIcon,
		gitubIcon,
		csharpIcon,
		nodejsIocn,
		Rss_FeedIcon,
		bilibiliIcon,
		javaScriptIcon,
		typeScriptIcon,
		tailwindcssIcon,
		favoriteBorderIcon,
	},
};
</script>

<style lang="less" scoped>
.centered-flex-row {
	@apply flex flex-row flex-wrap justify-center space-x-4;
}

.separation {
	@apply text-nord4;
	font-style: normal;

	&::before {
		content: '|';
	}
}

.paragraph {
	@apply space-y-2;
}

.link {
	@apply flex flex-row items-center space-x-1;

	&:hover {
		@apply text-nord9;
	}
}

.opacity-animation {
	animation: opacity 1.5s;

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}

.card-bg {
	@apply bg-nord4 bg-opacity-10;
	backdrop-filter: blur(10px);
}
</style>
