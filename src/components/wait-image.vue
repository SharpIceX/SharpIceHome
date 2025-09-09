<template>
	<div ref="containerReference" v-bind="$attrs">
		<img v-if="isLoaded" :src="src" :alt="alt" class="h-auto w-full object-cover" v-bind="$attrs" />
		<div v-else class="loader" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { waitImage } from '@/utils/load';

const properties = defineProps<{
	src: string;
	alt?: string;
}>();

const isLoaded = ref(false);
const containerReference = ref<HTMLElement>();

let observer: IntersectionObserver | undefined;

const loadImage = async () => {
	try {
		console.log('进入视口，准备加载:', properties.src);
		await waitImage(properties.src);
		isLoaded.value = true;
		console.log('图片加载完成:', properties.src);
	} catch (error) {
		console.warn('图片加载失败:', properties.src, error);
	}
};

onMounted(() => {
	if (!containerReference.value) return;
	observer = new IntersectionObserver(
		entries => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					loadImage();
					if (containerReference.value) {
						observer?.unobserve(containerReference.value);
					}
				}
			}
		},
		{ threshold: 0.1 },
	);
	observer.observe(containerReference.value);
	console.log('开始监听懒加载图片:', properties.src);
});

onBeforeUnmount(() => {
	if (observer) {
		observer.disconnect();
		console.log('取消监听:', properties.src);
		observer = undefined;
	}
});
</script>

<style lang="less" scoped>
@import url('nord/src/lesscss/nord.less');

/* By https://css-loaders.com */
.loader {
	width: 50px;
	padding: 8px;
	aspect-ratio: 1;
	border-radius: 50%;
	background: @nord7;
	--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
	-webkit-mask: var(--_m);
	mask: var(--_m);
	-webkit-mask-composite: source-out;
	mask-composite: subtract;
	animation: l3 1s infinite linear;

	@keyframes l3 {
		to {
			transform: rotate(1turn);
		}
	}
}
</style>
