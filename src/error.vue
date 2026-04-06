<template>
	<div class="error-container">
		<h1 class="code">{{ error?.status || 'Error' }}</h1>
		<p class="message">{{ error?.message || '发生了不可预料的错误' }}</p>
		<button class="back-btn" @click="handleError">
			<span class="text">返回首页</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps({
	error: Object as () => NuxtError,
});

useSeoMeta({
	title: error?.status === 404 ? '页面不存在' : '出错了',
});

const handleError = async () => {
	await clearError();
	await navigateTo('/', { external: true });
};
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.error-container {
	width: 100%;
	display: flex;
	height: 100dvh;
	word-break: normal;
	align-items: center;
	color: @fantasy-text;
	white-space: pre-wrap;
	font-family: monospace;
	flex-direction: column;
	overflow-wrap: anywhere;
	justify-content: center;
	background-color: @fantasy-bg-primary;

	.code {
		margin: 0;
		font-weight: 900;
		color: transparent;
		background-clip: text;
		letter-spacing: -0.02em;
		background: @fantasy-accent;
		-webkit-background-clip: text;
		font-size: clamp(8rem, 20vw, 9rem);
		filter: drop-shadow(@fantasy-glow-line);
	}

	.message {
		font-size: 1.2rem;
		color: @fantasy-text-muted;
	}
}

.back-btn {
	outline: none;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
	appearance: none;
	position: relative;
	border-radius: 25px;
	padding: 0.8rem 2.5rem;
	background: transparent;
	transition: all 0.3s ease;
	color: @fantasy-text-muted;
	border: 2px solid @fantasy-line-bright;

	&:hover {
		color: @fantasy-accent;
		transform: translateY(-3px);
		border-color: @fantasy-accent;
		box-shadow:
			0 5px 15px rgba(0, 0, 0, 0.1),
			@fantasy-glow-line;
	}

	&:active {
		transform: translateY(-1px);
		color: @fantasy-accent-soft;
		border-color: @fantasy-accent-soft;
	}
}
</style>
