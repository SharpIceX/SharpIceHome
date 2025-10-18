<template>
	<ul class="flex flex-wrap justify-center items-center h-full gap-4 py-10">
		<li v-for="link in LinkLists" :key="link.url">
			<FriendLinkCard
				:title="link.title"
				:url="link.url"
				:image="link.image"
				:description="link.description"
				:no-rounded="link.noRounded" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { LinkLists } from '../data/FriendLink/main';
import FriendLinkCard from '@/components/utils/FriendLinkCard.vue';

defineOptions({ name: 'LinkPage' });
definePageMeta({
	title: '友谊链接',
});
</script>
