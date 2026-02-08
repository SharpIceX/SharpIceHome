<template>
	<footer class="footer">
		<p>
			<span>🥰 来自 </span>
			<a href="https://github.com/SharpIceX/SharpIceHome" target="_blank">SharpIceX/SharpIceHome</a>
		</p>
	</footer>
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppFooter' });
</script>

<style lang="less" scoped>
@import (reference) '$/nord/src/lesscss/nord.less';

.footer {
	text-align: center;
	padding-block: 1rem;
	border-top: 1px solid @nord2;
}
</style>
