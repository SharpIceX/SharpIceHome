<template>
	<main>
		<ul class="flex w-[88rem] flex-wrap justify-center gap-8 max-lg:w-auto max-lg:flex-col">
			<li v-for="(link, index) in LinkList" :key="index" class="advanced-blur-backdrop">
				<a
					:href="link.url + '?ref=sharpice.top'"
					target="_blank"
					:aria-label="'访问' + link.title + '的个人网站'"
					class="flex h-full items-center">
					<div class="flex h-32 w-80 flex-row items-center space-x-4 px-6 py-3">
						<!-- 普通图片与 svg 组件 -->
						<div class="avatar-image">
							<LazyImage
								v-if="typeof link.image === 'string'"
								width="80"
								height="80"
								:src="link.image"
								:title="link.title"
								:alt="link.title + '的头像'" />

							<component :is="link.image" v-else :title="link.title" size="5rem" />
						</div>
						<div class="w-3/5">
							<h2 :title="link.title" class="truncate">{{ link.title }}</h2>
							<p :title="link.description" class="line-clamp-2 overflow-hidden text-ellipsis">
								{{ link.description }}
							</p>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</main>
</template>

<script>
import LinkList from './List';
import LazyImage from '@/components/LazyImage.vue';

export default {
	name: 'LinkPages',
	components: {
		LazyImage,
	},
	data() {
		return {
			LinkList,
		};
	},
};
</script>

<style lang="less" scoped>
.avatar-image {
	@apply flex items-center justify-center;
	@apply h-20 w-20;
	@apply select-none;

	* {
		border-radius: 50%;
	}
}
</style>
