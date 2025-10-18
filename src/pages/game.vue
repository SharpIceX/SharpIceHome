<template>
	<ul class="flex flex-wrap justify-center gap-4 py-10">
		<li v-for="link in GameData" :key="link.name">
			<GameLinkCard v-bind="link" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { GameData } from '../data/GameData/main';
import GameLinkCard from '@/components/utils/GameLinkCard.vue';

defineOptions({ name: 'GamePage' });
definePageMeta({
	title: '游戏推荐',
});
</script>
