<template>
	<div class="blog-tags">
		<header class="tag-header">
			<h1 class="tag-title">
				<tagsIcon class="tag-icon" aria-hidden="true" />
				<span>{{ currentTag }}</span>
			</h1>
			<p class="tag-count">共 {{ filteredCount }} 篇文章</p>
		</header>

		<hr class="g-separator" />

		<BlogTimeline :data="timeLineBlogs" />
	</div>
</template>

<script lang="ts" setup>
import type { BlogTimeline } from '#components';
import type { RouteRecordNormalized } from 'vue-router';
import tagsIcon from '@fortawesome/fontawesome-free/svgs/solid/tags.svg';

const route = useRoute();
const router = useRouter();

const currentTag = route.params.tags;

useSeoMeta({
	title: `标签: ${currentTag}`,
});

const timeLineBlogs: ComponentProps<typeof BlogTimeline>['data'] = [];
let filteredCount = 0;
{
	// 提取 Blog
	const allFiltered = router.getRoutes().filter((r) => {
		const isBlog = r.meta?.type === 'blog';
		const tags = (r.meta?.tags as string[]) || [];
		return isBlog && tags.includes(currentTag);
	});

	// 去重
	const uniqueBlogs = Array.from(
		allFiltered
			.reduce((map, r) => {
				if (!map.has(r.path)) {
					map.set(r.path, r);
				}
				return map;
			}, new Map<string, RouteRecordNormalized>())
			.values(),
	);

	// 排序
	const sorted = uniqueBlogs.sort((a, b) =>
		(b.meta.time?.createdAt || '').localeCompare(a.meta.time?.createdAt || ''),
	);

	// 分组 (YYYY.MM)
	const groupMap = new Map<string, (typeof timeLineBlogs)[number]['data']>();
	for (const blog of sorted) {
		const createdAt = blog.meta.time?.createdAt || '';
		const [year, month] = createdAt.split('-');

		if (!year || !month) continue;

		const title = `${year}.${month.padStart(2, '0')}`;

		if (!groupMap.has(title)) {
			groupMap.set(title, []);
		}

		groupMap.get(title)!.push({
			path: blog.path,
			time: blog.meta.time,
			title: blog.meta.title,
		});
		filteredCount++;
	}

	timeLineBlogs.push(...Array.from(groupMap, ([title, data]) => ({ title, data })));
}
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.blog-tags {
	width: 50%;
	display: flex;
	margin: 2rem auto;
	flex-direction: column;

	.tag-header {
		.tag-title {
			display: flex;
			margin: unset;
			column-gap: 0.5rem;
			flex-direction: row;
			align-items: center;

			.tag-icon {
				width: 1em;
				height: 1em;
			}
		}
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 90%;
	}
}
</style>
