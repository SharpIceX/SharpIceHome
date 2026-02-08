<template>
	<footer class="text-center py-4">
		<p>
			🥰 来自
			<a
				href="https://github.com/SharpIceX/SharpIceHome"
				target="_blank"
				class="ext-nord8 hover:text-nord10 text-nord7 transition-colors">
				SharpIceX/SharpIceHome
			</a>
		</p>
		<DataCenter />
	</footer>
</template>

<script lang="ts" setup>
import DataCenter from '~/components/utils/data-center.vue';

defineOptions({ name: 'AppFooter' });
</script>
