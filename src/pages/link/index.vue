<template>
	<main>
		<ul class="flex w-[88rem] flex-wrap justify-center gap-8 max-lg:w-auto max-lg:flex-col">
			<li v-for="link in LinkLists" :key="link.url" class="advanced-blur-backdrop advanced-blur-backdrop-hover">
				<a
					:href="`${link.url}?ref=sharpice.top`"
					target="_blank"
					:aria-label="`访问${link.title}的个人网站`"
					class="flex h-full items-center">
					<article class="flex h-32 w-80 flex-row items-center space-x-4 px-6 py-3">
						<div v-if="link.image" class="avatar-image">
							<LazyImage
								v-if="typeof link.image === 'string'"
								:width="80"
								:height="80"
								:src="link.image"
								:title="link.title"
								:alt="`${link.title}的头像`"
								:class="link.noRounded ? 'no-rounded' : ''" />
						</div>
						<div>
							<h2 :title="link.title" class="truncate text-xl font-bold">
								{{ link.title }}
							</h2>
							<p
								v-if="link.description"
								:title="link.description"
								class="line-clamp-2 overflow-hidden text-ellipsis">
								{{ link.description }}
							</p>
						</div>
					</article>
				</a>
			</li>
		</ul>
	</main>
</template>

<script lang="ts" setup>
import { LinkLists } from './list';
import LazyImage from '@/components/wait-image.vue';

defineOptions({ name: 'LinkPage' });
definePageMeta({
	title: '友谊链接',
});
</script>

<style lang="less" scoped>
.advanced-blur-backdrop {
	@apply "max-md:border-1 max-md:border-nord9 max-md:rounded-3xl";
}

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
