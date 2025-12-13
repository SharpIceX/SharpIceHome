<template>
	<ul class="flex flex-wrap justify-center items-center h-full gap-4 py-10">
		<li v-for="link in FriendLinkData" :key="link.url">
			<FriendLinkCard v-bind="link" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { FriendLinkData } from '../data/FriendLinkData/main';
import FriendLinkCard from '@/components/utils/friend-link-card.vue';

defineOptions({ name: 'LinkPage' });
definePageMeta({
	title: '友谊链接',
	description: '我的朋友们',
});
</script>
