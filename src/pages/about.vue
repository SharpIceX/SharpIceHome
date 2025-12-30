<template>
	<article>
		<section class="post-content">
			<h1>关于我</h1>
			<p>
				你可以叫我<strong>锐冰</strong>，也可以叫我的全名<strong>锐冰龙</strong>。目前我主要做个人项目开发以及为一些开源项目贡献本地化。
			</p>
			<h2>本地化工作</h2>
			<p>
				目前我主要为
				<a href="https://github.com/tom5454/CustomPlayerModels" target="_blank">Custom Player Models</a>
				和
				<a href="https://kde.org/zh-cn" target="_blank">KDE</a>
				做简体中文本地化工作。
			</p>
			<h2>关于我自己的架空世界观项目</h2>
			<p>
				从 2020
				年开始，我一直在构筑属于自己的架空世界观。虽然这一路经历了许多重大变更，一度无法完整呈现，但如今它正在慢慢成形。你可以在
				<a href="https://ts.sharpice.top" target="_blank">这里</a>
				了解更多。
			</p>
			<h2>技术栈</h2>
			<p>
				说来话长~
				<br />
				我目前主要使用 TypeScript 和少量的 C# 来开发我自己的项目，不过我曾经也用过 Python、Lua、Java、Go
				等语言进行过一些小项目的开发，但很少深入，因为我的项目大多数需求主要集中在前端或者 cli 工具上。
			</p>
		</section>
	</article>
</template>

<script setup>
definePageMeta({
	title: '关于我',
	description: '了解更多关于我的信息',
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
		@apply "text-nord7 font-medium hover:text-nord10 focus:outline-none focus:ring-2 focus:ring-nord9";
	}
}
</style>
