<template>
	<!-- TODO: 需要合入 index.vue，并且删除 `.nuxtignore`，因为新版本 Nuxt 会不热重载被忽略的内容 -->
	<ul class="list">
		<li v-for="item in list" :key="item.name">
			<a :href="item.url" target="_blank">
				<span aria-hidden="true" class="icon">
					<component :is="item.icon" />
				</span>
				<span>{{ item.name }}</span>
			</a>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import type { Raw } from 'vue';

interface ListItem {
	url: string;
	name: string;
	icon: Raw<Component>;
}

const { list } = defineProps<{
	list: ListItem[];
}>();
</script>

<style lang="less" scoped>
.list {
	gap: 1rem;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	font-size: 1.1rem;
	user-select: none;
	flex-direction: row;
	list-style-type: none;
	justify-content: center;

	li {
		display: block;

		a {
			display: flex;
			column-gap: 0.5rem;

			.icon {
				display: flex;
				align-items: center;
			}
		}
	}
}
</style>
