<template>
	<div>
		<loading v-if="loading" />
		<Home v-else />
	</div>
</template>

<script>
import Home from './home.vue';
import loading from './loading.vue';
import FontFaceObserver from 'fontfaceobserver';

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
		const fonts = new FontFaceObserver('LXGW WenKai');
		fonts.load().then(() => {
			this.loading = false;
		});
	},
};
</script>
