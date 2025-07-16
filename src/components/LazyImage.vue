<template>
	<div ref="containerRef">
		<img
			v-if="isLoaded"
			:src="src"
			:alt="alt"
			v-bind="{ title, width, height }"
			class="h-auto w-full object-cover" />
		<div v-else class="loader"></div>
	</div>
</template>

<script lang="ts">
import { loadImage as preloadImage } from '@/utils/load';
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
	name: 'LazyImage',
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		width: {
			type: Number,
			default: undefined,
		},
		height: {
			type: Number,
			default: undefined,
		},
	},
	setup(props) {
		const isLoaded = ref(false);
		const containerRef = ref<HTMLElement | null>(null);
		let observer: IntersectionObserver | null = null;

		async function loadAndDecodeImage() {
			try {
				console.log('进入视口，准备加载:', props.src);
				await preloadImage(props.src);
				isLoaded.value = true;
				console.log('图片加载完成:', props.src);
			} catch (err) {
				console.warn('图片加载失败:', props.src, err);
			}
		}

		onMounted(() => {
			if (!containerRef.value) return;

			observer = new IntersectionObserver(
				entries => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							loadAndDecodeImage();
							if (containerRef.value) {
								observer?.unobserve(containerRef.value);
							}
						}
					}
				},
				{ threshold: 0.1 },
			);

			observer.observe(containerRef.value);
			console.log('开始监听懒加载图片:', props.src);
		});

		onBeforeUnmount(() => {
			if (observer && containerRef.value) {
				observer.unobserve(containerRef.value);
				observer.disconnect();
				observer = null;
				console.log('取消监听:', props.src);
			}
		});

		return {
			isLoaded,
			containerRef,
		};
	},
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
