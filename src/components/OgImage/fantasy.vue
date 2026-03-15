<template>
	<div class="og-container">
		<div class="inner-border">
			<div class="header">
				<img src="/favicon.png" class="logo" />
				<p class="text">SharpIce Home</p>
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
const { title, description } = defineProps<{
	title?: string;
	description?: string;
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
}

.inner-border {
	width: 100%;
	height: 100%;
	display: flex;
	padding: 60px;
	position: relative;
	flex-direction: column;
	justify-content: center;
	border: 2px solid @fantasy-line-dim;
	font-family: 'LXGW Wenkai', ui-serif, serif;

	text-rendering: optimizeLegibility;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;

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
			width: 5em;
			height: 5em;
		}

		.text {
			font-size: 2.5em;
		}
	}

	.title {
		max-width: 80%;
		font-size: 4em;
		line-height: 1.1;
		font-weight: 800;
		text-shadow: @fantasy-glow-text;
	}

	.description {
		display: flex;
		flex-wrap: wrap;
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
			color: @fantasy-text-disabled;
		}
	}
}
</style>
