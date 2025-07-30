<template>
	<article class="advanced-blur-backdrop advanced-blur-backdrop-hover advanced-blur-before w-9/12">
		<section class="post-content">
			<h1>关于我</h1>
			<p>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>你可以叫我 <strong>锐冰</strong>，也可以叫我的全名 <strong>锐冰龙</strong>。</span>
				<span>我目前主要做个人项目开发以及个人本地化工作。</span>
			</p>
			<h2>本地化工作</h2>
			<p>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>
					目前我主要为
					<a href="https://github.com/tom5454/CustomPlayerModels" target="_blank">Custom Player Models</a>
					做简体中文本地化工作。
				</span>
				<span>
					在做翻译及本地化过程性我难免会使用到<strong>机器翻译</strong>和<strong>大预言模型</strong>提供的建议来改善翻译质量。
				</span>
			</p>
			<p>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>2019 至 2020 年间，我曾在一个汉化组参与翻译工作。</span>
				<span>此后的一段时间，我主要从事一些闭源软件的逆向翻译工作。</span>
				<span>目前，我将精力集中于为开源项目贡献本地化内容。</span>
			</p>
			<h2>我是<strong>Furry</strong>吗？</h2>
			<p>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>
					不是哦，我是
					<strong>幻想生物</strong>/<strong>人外</strong>。
				</span>
			</p>
		</section>
	</article>
</template>

<script setup>
defineOptions({ name: 'AboutPage' });
</script>

<style lang="less" scoped>
.post-content {
	@apply px-8 py-4;
	backdrop-filter: brightness(0.9);

	// 通用段落样式
	p {
		@apply mb-4;
	}

	span {
		display: inline-block;
	}

	// 标题样式

	h1 {
		@apply mb-4 mt-6 text-2xl font-bold;
	}

	h2 {
		@apply mb-3 mt-5 text-xl font-semibold;
	}

	h3 {
		@apply mb-2 mt-4 text-lg font-medium;
	}

	h4 {
		@apply mb-2 mt-3 text-base font-medium;
	}

	h5 {
		@apply mb-1 mt-2 text-sm font-medium;
	}

	h6 {
		@apply mb-1 mt-2 text-xs;
	}

	// 链接
	a {
		@apply text-nord8;
		@apply hover:text-nord10;
		// @apply visited:text-nord11;
		@apply focus:outline-none focus:ring-2 focus:ring-nord9;
	}
}
</style>
