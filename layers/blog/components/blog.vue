<template>
	<article class="blog-container">
		<header class="blog-header">
			<h1 v-if="$route.meta['title']">{{ $route.meta['title'] }}</h1>
			<p v-if="$route.meta['description']">{{ $route.meta['description'] }}</p>

			<ul>
				<li v-if="$route.meta['created_at']" class="time">
					<span>创建时间：</span>
					<span>{{ $route.meta['created_at'] }}</span>
				</li>
				<li v-if="$route.meta['updated_at']" class="time">
					<span>更新时间：</span>
					<span>{{ $route.meta['updated_at'] }}</span>
				</li>

				<br />

				<li v-if="$route.meta['tags']" class="tags">
					<span>标签：</span>
					<ul>
						<li></li>
					</ul>
				</li>
			</ul>
		</header>

		<section class="blog-content">
			<MDCRenderer :body="render.body" :data="render.data" />
		</section>
	</article>
</template>

<script lang="ts" setup>
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

defineOptions({ name: 'Blog' });
const { blogContent } = defineProps<{ blogContent: string }>();

const render = await parseMarkdown(blogContent);
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.blog-container {
	width: 70%;
	padding: 3rem;
	margin: 5rem auto;
	border-radius: 16px;
	backdrop-filter: blur(12px);
	border: 1px solid @fantasy-line-dim;
	background-color: oklch(from @fantasy-bg-secondary l c h / 0.6);

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 90%;
	}

	.blog-content {
		overflow-x: hidden;
	}
}
</style>
