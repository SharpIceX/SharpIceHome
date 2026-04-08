<template>
	<div class="friend-container">
		<h1 class="title">朋友们</h1>
		<ul class="friend-list">
			<li v-for="item in friendsList" :key="item.url" class="friend-card-container">
				<a
					:href="getRefUrl(item.url)"
					target="_blank"
					class="friend-card"
					rel="noopener noreferrer"
					@dragstart="handleDragStart($event, item.title)">
					<div v-if="item.avatar" aria-hidden="true" class="avatar-container">
						<img
							:src="item.avatar"
							draggable="false"
							class="avatar-img"
							:class="{ 'is-rounded': !item.noRounded }" />
					</div>
					<p class="name">{{ item.title }}</p>
				</a>
			</li>
		</ul>

		<div ref="dragPreview" class="drag-preview-ghost">
			<span class="preview-text"></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { friendsList } from '~/data/friends/main';

useSeoMeta({
	title: '朋友们',
	description: '友谊连接',
});

// # 自定义拖拽预览
const dragPreview = ref<HTMLElement | null>(null);
const handleDragStart = (e: DragEvent, title: string) => {
	if (dragPreview.value && e.dataTransfer) {
		const textNode = dragPreview.value.querySelector('.preview-text');
		if (textNode) textNode.textContent = title;
		e.dataTransfer.setDragImage(dragPreview.value, 24, dragPreview.value.offsetHeight / 2);
	}
};

/** 获取带跟踪链接的友谊连接 */
const getRefUrl = (rawUrl: string): string => {
	const url = new URL(rawUrl);
	url.searchParams.set('ref', 'sharpice.top');
	return url.href;
};
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.friend-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.title {
		display: flex;
		padding-left: 5rem;

		// # 小屏幕
		@media (max-width: 1024px) {
			padding-left: unset;
			justify-content: center;
		}
	}

	.friend-list {
		gap: 1.5rem;
		display: flex;
		margin: 0 auto;
		max-width: 90%;
		flex-wrap: wrap;
		padding: 0 1rem;
		list-style: none;
		justify-content: center;
	}
}

.friend-card-container {
	width: 240px;

	.friend-card {
		display: flex;
		height: 240px;
		padding: 1.8rem;
		position: relative;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		border: 1px solid @fantasy-line-dim;
		border-radius: 18px 18px 18px 18px / 16px 16px 16px 16px;
		background-color: oklch(from @fantasy-bg-secondary l c h / 0.6);

		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: translateY(-8px);
			border-color: @fantasy-line-bright;
			box-shadow: 0 10px 30px oklch(0 0 0 / 0.3);
			background-color: oklch(from @fantasy-bg-tertiary l c h / 0.8);
		}
	}

	.avatar-container {
		display: flex;
		margin-bottom: 1.2rem;

		.avatar-img {
			width: 85px;
			height: 85px;
			object-fit: cover;
			transition: transform 0.5s ease;

			&.is-rounded {
				border-radius: 50%;
			}
		}
	}

	.name {
		font-weight: 600;
		font-size: 1.15rem;
		color: @fantasy-text;
		margin-bottom: 0.6rem;
		letter-spacing: 0.5px;

		&:first-child {
			margin: unset;
			font-size: 2rem;
		}
	}
}

.drag-preview-ghost {
	left: 0;
	top: -500px;
	display: flex;
	position: fixed;
	align-items: center;
	border-radius: 20px;
	white-space: nowrap;
	pointer-events: none;
	padding: 0.5rem 1rem;
	border: 1px solid @fantasy-line-dim;
	background-color: @fantasy-bg-tertiary;

	.preview-text {
		font-size: 1.2rem;
		font-weight: 600;
		margin-left: 1.5rem;
	}
}
</style>
