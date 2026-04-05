<template>
	<section class="latest-posts">
		<h1>最新文章</h1>
		<ul class="post-list">
			<li v-for="blog in latestBlogs" :key="blog.path" class="post-item">
				<NuxtLink :to="blog.path">
					<h2 class="post-title">{{ blog.meta.title }}</h2>
				</NuxtLink>

				<p v-if="blog.meta.description" class="post-description">
					{{ blog.meta.description }}
				</p>

				<div class="post-time">
					<p>创建时间：{{ blog.meta.time.createdAt }}</p>
					<p v-if="blog.meta.time.createdAt !== blog.meta.time.updatedAt">
						更新时间：{{ blog.meta.time.updatedAt }}
					</p>
				</div>

				<div v-if="blog.meta.tags" class="post-tags">
					<tagsIcon aria-label="标签" class="icon" />
					<ul class="tag-wrapper">
						<li v-for="item in blog.meta.tags" :key="item">
							<NuxtLink :to="`/特殊页面/tags/${item}`">{{ item }}</NuxtLink>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</section>
</template>

<script lang="ts" setup>
import tagsIcon from '@fortawesome/fontawesome-free/svgs/solid/tags.svg';

useSeoMeta({
	title: '博客',
});

const router = useRouter();
const latestBlogs = computed(() => {
	return router
		.getRoutes()
		.filter((route, index, self) => {
			// 筛选 blog 类型并确保有时间数据
			const isBlog = route.meta?.type === 'blog';
			// 路由去重：只保留相同路径下的第一个记录
			const isFirstOccur = self.findIndex((r) => r.path === route.path) === index;
			return isBlog && isFirstOccur;
		})
		.sort((a, b) => {
			// 将格式化字符串转为毫秒数进行降序排列
			const getTime = (r: any) => new Date(r.meta.time.updatedAt).getTime();
			return getTime(b) - getTime(a);
		})
		.slice(0, 10);
});
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.latest-posts {
	display: flex;
	flex-direction: column;

	h1 {
		text-align: center;
	}

	.post-list {
		width: 100%;
		row-gap: 2rem;
		display: flex;
		margin: unset;
		padding: unset;
		align-items: center;
		flex-direction: column;

		.post-item {
			width: 60%;
			row-gap: 1rem;
			display: flex;
			padding: 1rem 2rem;
			white-space: normal;
			list-style-type: none;
			flex-direction: column;
			word-break: break-word;
			overflow-wrap: break-word;
			border: 1px dashed @fantasy-line-dim;
			background-color: @fantasy-bg-secondary;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			border-radius: 14px 14px 14px 14px / 12px 12px 12px 12px;

			&:hover {
				border: 1px solid oklch(from @fantasy-accent-hover l c h / 0.5);
			}

			.post-title {
				margin: unset;
			}

			.post-description {
				margin: unset;
				line-height: 1.5;
			}

			.post-time {
				display: flex;
				column-gap: 1rem;
				flex-direction: row;

				p {
					margin: 0;
					padding: 0;
				}
			}

			.post-tags {
				display: flex;
				user-select: none;

				.tag-wrapper {
					display: flex;
					column-gap: 0.75rem;
					list-style-type: none;
					padding-inline: 0.5rem;
				}
			}

			// # 小屏幕
			@media (max-width: 1024px) {
				width: 95%;
			}
		}
	}
}
</style>
