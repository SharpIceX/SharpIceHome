<template>
	<footer class="footer-container" role="contentinfo">
		<p>
			<span>🥰 来自·</span>
			<a href="https://github.com/SharpIceX/SharpIceHome" target="_blank"> SharpIceX/SharpIceHome </a>
		</p>
	</footer>
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppFooter' });
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.footer-container {
	flex-shrink: 0;
	user-select: none;
	text-align: center;
	padding-block: 0.3rem;
	border-top: 1px solid @fantasy-line-dim;

	a {
		font-weight: 600;
		color: @fantasy-accent;

		&:hover {
			color: @fantasy-accent-hover;
			text-shadow: @fantasy-glow-text;
		}

		&:active {
			color: @fantasy-accent-active;
		}
	}
}
</style>
