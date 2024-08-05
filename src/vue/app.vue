<template>
	<loading v-if="loading" />
	<Home v-else />
</template>

<script>
import Home from './home.vue';
import loading from './loading.vue';
import { waitForFont } from '../js/utils.js';

export default {
	data() {
		return {
			loading: true,
		};
	},
	components: {
		Home,
		loading,
	},
	mounted() {
		waitForFont('LXGW WenKai')
			.catch(() => {})
			.finally(() => (this.loading = false));
	},
};
</script>
