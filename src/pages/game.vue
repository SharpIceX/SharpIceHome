<template>
	<ul class="flex flex-wrap justify-center gap-4 py-10">
		<li v-for="link in GameData" :key="link.name">
			<GameLinkCard v-bind="link" />
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { GameData } from '../data/GameData/main';
import GameLinkCard from '@/components/utils/game-card.vue';

defineOptions({ name: 'GamePage' });
definePageMeta({
	title: '游戏推荐',
	description: '我这里有些最好玩的游戏',
});
</script>
