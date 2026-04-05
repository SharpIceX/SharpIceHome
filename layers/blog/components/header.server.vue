<template>
	<header class="blog-header">
		<h1 class="title">{{ props.meta['title'] }}</h1>
		<p v-if="props.meta['description']" class="description">{{ props.meta['description'] }}</p>

		<ul class="metadata">
			<li class="time">
				<span>创建时间：</span>
				<span>{{ props.meta['time'].createdAt }}</span>
			</li>
			<li v-if="props.meta['time'].createdAt !== props.meta['time'].updatedAt" class="time">
				<span>更新时间：</span>
				<span>{{ props.meta['time'].updatedAt }}</span>
			</li>
		</ul>

		<div v-if="props.meta['tags']" class="tags">
			<tagsIcon aria-label="标签：" />
			<ul>
				<li v-for="item in props.meta['tags']" :key="item">
					<NuxtLink :to="`/tags/${item}`">{{ item }}</NuxtLink>
				</li>
			</ul>
		</div>
	</header>
</template>

<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';
import tagsIcon from '@fortawesome/fontawesome-free/svgs/solid/tags.svg';

defineOptions({ name: 'BlogHeader' });

const props = defineProps<{
	meta: RouteMeta;
}>();
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.blog-header {
	.title,
	.description {
		line-height: 1.2;
		text-wrap: balance;
		word-break: keep-all;
		overflow-wrap: break-word;
		text-autospace: ideograph-alpha;
	}

	.title {
		margin: unset;
	}

	.metadata {
		gap: 1rem;
		display: flex;
		padding: unset;
		flex-wrap: wrap;
		list-style-type: none;
		color: @fantasy-text-muted;
	}

	.tags {
		display: flex;
		user-select: none;
		column-gap: 0.5rem;

		ul {
			display: flex;
			margin: unset;
			padding: unset;
			column-gap: 1rem;
			list-style-type: none;
		}
	}
}
</style>
