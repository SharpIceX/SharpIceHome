<template>
	<div class="w-8/12">
		<article class="advanced-blur-backdrop advanced-blur-backdrop-hover advanced-blur-before">
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
					<span>在做翻译及本地化过程性我难免会使用到<strong>机器翻译</strong>来改善翻译质量。</span>
				</p>
				<p>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<span>2019 至 2020 年间，我曾在一个汉化组参与翻译工作。</span>
					<span>此后的一段时间，我主要从事一些闭源软件的逆向翻译工作。</span>
					<span>目前，我将精力集中于为开源项目贡献本地化内容。</span>
				</p>
			</section>
		</article>
	</div>
</template>

<script setup>
definePageMeta({
	title: '关于我',
});
</script>

<style lang="less" scoped>
.post-content {
	@apply "px-8 py-4";
	backdrop-filter: brightness(0.9);

	// 段落
	p {
		@apply "mb-4";
	}

	span {
		display: inline-block;
	}

	// 标题
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.25;
	}

	h1 {
		font-size: 1.5rem;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.25rem;
		margin-top: 1.25rem;
		margin-bottom: 0.75rem;
	}

	h3 {
		font-size: 1.125rem;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	h4 {
		font-size: 1rem;
		margin-top: 0.75rem;
		margin-bottom: 0.5rem;
	}

	h5 {
		font-size: 0.875rem;
		margin-top: 0.5rem;
		margin-bottom: 0.25rem;
	}

	h6 {
		font-size: 0.75rem;
		margin-top: 0.5rem;
		margin-bottom: 0.25rem;
	}

	// 链接
	a {
		@apply "text-nord8 hover:text-nord10 focus:outline-none focus:ring-2 focus:ring-nord9";
	}
}
</style>
