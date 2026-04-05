<template>
	<div class="timeline">
		<div v-for="group in props.data" :key="group.title" class="timeline-group">
			<div class="timeline-label">
				<span class="label-diamond"></span>
				<span class="label-text">{{ group.title }}</span>
			</div>

			<ul class="archive-posts">
				<li v-for="blog in group.data" :key="blog.path" class="post-item">
					<NuxtLink :to="blog.path as string" class="post-link">
						<span class="post-day">{{ getDay(blog.time.createdAt) }}日</span>
						<h3 class="post-title">{{ blog.title }}</h3>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';

const props = defineProps<{
	data: {
		title: string;
		data: {
			title: string;
			path: string;
			time: RouteMeta['time'];
		}[];
	}[];
}>();

/** 提取文章当前的几号 */
const getDay = (dateStr: string = '') => {
	const [datePart = ''] = dateStr.split(' ');
	const parts = datePart.split('-');
	const day = parts[2];
	return day ? Number.parseInt(day, 10).toString() : '？';
};
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.timeline {
	position: relative;
	padding-left: 0.5rem;

	.timeline-group {
		position: relative;
		padding-bottom: 2rem;

		.timeline-label {
			gap: 1rem;
			display: flex;
			align-items: center;
			margin-bottom: 1.5rem;

			.label-diamond {
				width: 10px;
				height: 10px;
				flex-shrink: 0;
				transform: rotate(45deg);
				background: @fantasy-accent;
				background-color: transparent;
				border: 1.5px solid @fantasy-accent;
				box-shadow: 0 0 8px color-mix(in oklch, @fantasy-accent 40%, transparent);
			}

			.label-text {
				font-size: 1.4rem;
				font-weight: bold;
				font-family: monospace;
				color: @fantasy-accent;
			}
		}

		.archive-posts {
			list-style: none;

			.post-item {
				margin-bottom: 1rem;

				.post-link {
					gap: 1rem;
					display: flex;
					color: inherit;
					align-items: baseline;
					text-decoration: none;
					transition: all 0.2s ease;

					.post-day {
						min-width: 40px;
						font-size: 0.9rem;
						font-family: monospace;
						color: @fantasy-text-muted;
					}

					.post-title {
						margin: 0;
						font-size: 1.1rem;
						font-weight: normal;
						border-bottom: 1px solid transparent;
					}

					&:hover {
						transform: translateX(8px);
						color: @fantasy-accent-hover;

						.post-title {
							border-bottom-color: @fantasy-accent-hover;
						}
					}
				}
			}
		}
	}
}
</style>
