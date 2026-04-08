<template>
	<div class="blog-posts">
		<h1>博客</h1>

		<div class="archive-tags-bar">
			<tagsIcon class="tags-icon" aria-label="标签" />
			<ul class="archive-tags-list">
				<li v-for="tag in allTags" :key="tag">
					<NuxtLink :to="`/tags/${tag}`" class="tag-chip">{{ tag }}</NuxtLink>
				</li>
			</ul>
		</div>

		<hr class="g-separator" />

		<BlogTimeline :data="timeLineBlogs" />
	</div>
</template>

<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';
import { BlogTimeline } from '#components';
import tagsIcon from '@fortawesome/fontawesome-free/svgs/solid/tags.svg';

useSeoMeta({
	title: '博客',
});

const router = useRouter();

// # 获取所有博客并去重
const allBlogs = (() => {
	// 筛出博客
	const rawRoutes = router.getRoutes().filter((route) => route.meta?.type === 'blog');

	// 去重
	const uniqueMap = new Map<string, RouteMeta>();

	for (const route of rawRoutes) {
		if (!uniqueMap.has(route.path)) {
			uniqueMap.set(route.path, {
				...route.meta,
				path: route.path,
			});
		}
	}

	return Array.from(uniqueMap.values());
})();

// # 提取所有不重复的标签
const allTags = [...new Set(allBlogs.flatMap((blog) => blog.tags || []))].sort();

// # 按 "YYYY.M" 分组博客内容
const timeLineBlogs = (() => {
	const groupMap = new Map<string, ComponentProps<typeof BlogTimeline>['data'][number]['data']>();

	// 排序
	const sorted = [...allBlogs].sort(
		(a, b) => new Date(b.time.createdAt).getTime() - new Date(a.time.createdAt).getTime(),
	);

	for (const blog of sorted) {
		const d = new Date(blog.time.createdAt);
		const title = `${d.getFullYear()}.${d.getMonth() + 1}`;

		if (!groupMap.has(title)) {
			groupMap.set(title, []);
		}

		groupMap.get(title)!.push({
			path: blog.path!,
			title: blog.title,
			createdAt: blog.time.createdAt,
		});
	}

	return Array.from(groupMap, ([title, data]) => ({ title, data }));
})();
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.blog-posts {
	width: 50%;
	display: flex;
	margin: 2rem auto;
	flex-direction: column;

	.archive-tags-bar {
		gap: 0.8rem;
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;

		.tags-icon {
			opacity: 0.8;
			width: 1.2rem;
			color: @fantasy-accent;
		}

		.archive-tags-list {
			padding: 0;
			gap: 0.6rem;
			display: flex;
			flex-wrap: wrap;
			list-style: none;

			.tag-chip {
				color: inherit;
				font-size: 0.85rem;
				border-radius: 20px;
				text-decoration: none;
				padding: 0.2rem 0.7rem;
				transition: all 0.3s ease;
				background: @fantasy-bg-secondary;
				border: 1px solid @fantasy-line-dim;

				&:hover {
					background: transparent;
					color: @fantasy-accent-hover;
					border-color: @fantasy-accent-hover;
				}
			}
		}
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 90%;
	}
}
</style>
