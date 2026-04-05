<template>
	<div class="og-container">
		<div class="inner-border">
			<div class="header">
				<img :src="faviconIcon" class="logo" />
				<p class="text">
					<span>SharpIce Home</span>
					<span v-if="props.type"> / Blog</span>
				</p>
			</div>

			<h1 class="title">{{ title }}</h1>
			<h1 class="description">{{ description }}</h1>

			<div class="footer">
				<span class="tag">Nexus Network</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { RouteMeta } from 'vue-router';
import faviconIcon from '~/../public/favicon.png?url&inline';

const props = defineProps<{
	title?: string;
	description?: string;
	type?: RouteMeta['type'];
}>();
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.og-container {
	width: 100%;
	height: 100%;
	display: flex;
	padding: 50px;
	align-items: center;
	color: @fantasy-text;
	justify-content: center;
	background-color: @fantasy-bg-primary;
	font-family:
		// 默认
		'LXGW Bright',
		// 兜底
		'Noto Sans SC',
		'Noto Sans CJK SC',
		'Source Han Sans SC',
		'Source Han Sans CN',
		// 系统
		-apple-system,
		BlinkMacSystemFont,
		'Segoe UI',
		'PingFang SC',
		// 通用
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol';
}

.inner-border {
	width: 100%;
	height: 100%;
	display: flex;
	padding: 60px;
	position: relative;
	flex-direction: column;
	justify-content: center;
	text-rendering: optimizeLegibility;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	border: 2px solid @fantasy-line-dim;

	.header {
		gap: 12px;
		top: -30px;
		left: 40px;
		display: flex;
		padding: 0 15px;
		position: absolute;
		align-items: center;
		flex-direction: row;
		background-color: @fantasy-bg-primary;

		.logo {
			width: 4em;
			height: 4em;
		}

		.text {
			font-size: 2em;
		}
	}

	.title,
	.description {
		text-wrap: balance;
		word-break: keep-all;
		overflow-wrap: break-word;
		text-autospace: ideograph-alpha;
	}

	.title {
		font-size: 3em;
		font-weight: bold;
	}

	.description {
		color: @fantasy-text-muted;
	}

	.footer {
		right: 40px;
		bottom: -15px;
		padding: 0 15px;
		position: absolute;
		background-color: @fantasy-bg-primary;

		.tag {
			font-size: 1.5em;
			letter-spacing: 4px;
			color: @fantasy-text-muted;
		}
	}
}
</style>
