<template>
	<Card>
		<a :href="`${url}?ref=sharpice.top`" target="_blank" class="flex h-full items-center">
			<article class="flex h-32 w-80 flex-row items-center space-x-4 px-6 py-3">
				<div v-if="image" aria-hidden="true" class="avatar-image">
					<LazyImage
						v-if="image"
						:width="80"
						:height="80"
						:src="image"
						:class="noRounded ? 'no-rounded' : ''" />
				</div>
				<div>
					<h2 :title="title" class="truncate text-xl font-bold">
						{{ title }}
					</h2>
					<p v-if="description" :title="description" class="line-clamp-2 overflow-hidden text-ellipsis">
						{{ description }}
					</p>
				</div>
			</article>
		</a>
	</Card>
</template>

<script lang="ts" setup>
import Card from '../base/Card.vue';
import LazyImage from '@/components/base/WaitImage.vue';

defineProps<{
	title: string;
	url: string;
	image?: string | undefined;
	description?: string | undefined;
	noRounded?: boolean | undefined;
}>();
</script>

<style lang="less" scoped>
.avatar-image {
	display: flex;
	min-width: 5rem;
	min-height: 5rem;
	max-width: 5rem;
	max-height: 5rem;
	user-select: none;
	align-items: center;
	justify-content: center;

	:deep(img):not(.no-rounded) {
		border-radius: 50%;
	}
}
</style>
