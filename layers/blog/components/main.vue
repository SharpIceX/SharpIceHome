<template>
	<article class="blog-container">
		<BlogHeader />

		<hr class="header-separator-line" />

		<BlogContent :blog-content="prop.blogContent" />
	</article>
</template>

<script lang="ts" setup>
defineOptions({ name: 'BlogMain' });
const prop = defineProps<{ blogContent: string }>();
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.blog-container {
	width: 60%;
	padding: 3rem;
	margin: 5rem auto;
	backdrop-filter: blur(12px);
	border: 1px dashed @fantasy-line-dim;
	border-radius: 16px 16px 16px 16px/ 14px 14px 14px 14px;
	background-color: oklch(from @fantasy-bg-secondary l c h / 0.6);

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 100%;
		padding: 1.5rem;
		border-radius: unset;
	}

	.header-separator-line {
		height: 1px;
		width: 100%;
		border: none;
		margin: 2.5rem 0;
		background-size: 8px 1px;
		background-image: linear-gradient(
			to right,
			@fantasy-line-dim 0%,
			@fantasy-line-dim 30%,
			transparent 30%,
			transparent 100%
		);

		&::before {
			content: '';
			width: 12px;
			height: 2px;
			display: block;
			margin-bottom: 4px;
			background: @fantasy-accent;
		}
	}
}
</style>
