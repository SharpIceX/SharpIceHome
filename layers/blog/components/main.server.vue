<template>
	<article class="blog-container">
		<BlogHeader :meta="props.meta" />

		<hr class="g-separator" />

		<BlogContent :blog-content="props.blogContent" />
	</article>
</template>

<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';

defineOptions({ name: 'BlogMain' });

const props = defineProps<{
	meta: RouteMeta;
	blogContent: string;
}>();
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
}
</style>
