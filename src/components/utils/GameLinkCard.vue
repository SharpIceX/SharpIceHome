<template>
	<Card>
		<article class="flex h-68 w-80 flex-col gap-2">
			<LazyImage aria-hidden="true" class="cover-image" :src="cover" />
			<div class="flex flex-col gap-2 h-3/10 w-full justify-cent pb-4 items-center">
				<h2 :title="name" class="truncate text-xl font-bold">
					{{ name }}
				</h2>
				<ul class="flex flex-row flex-wrap gap-4">
					<li v-for="(value, key) in link" :key="key">
						<!-- 官网 -->
						<a v-if="key === 'official'" :href="`${value}?ref=sharpice.top`" target="_blank">
							<languageIcon />
						</a>

						<!-- Steam -->
						<a
							v-else-if="key === 'steam'"
							:href="`https://store.steampowered.com/app/${value}?ref=sharpice.top`"
							target="_blank">
							<steamIcon />
						</a>

						<!-- Epic Games -->
						<a
							v-else-if="key === 'epic'"
							:href="`https://www.epicgames.com/store/p/${value}?ref=sharpice.top`"
							target="_blank">
							<epicGameIcon />
						</a>
					</li>
				</ul>
			</div>
		</article>
	</Card>
</template>

<script lang="ts" setup>
import Card from '../base/Card.vue';
import epicGameIcon from '@/icon/Epic_Games.svg';
import LazyImage from '@/components/base/WaitImage.vue';
import type { GameDataType } from '@/data/GameData/main';
import languageIcon from '@material-design-icons/svg/round/language.svg';
import steamIcon from '@fortawesome/fontawesome-free/svgs/brands/steam.svg';

defineProps<GameDataType>();
</script>

<style lang="less" scoped>
.cover-image {
	@apply "flex-1";

	width: 100%;
	display: flex;
	overflow: hidden;
	user-select: none;
	align-items: center;
	justify-content: center;

	:deep(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}

:deep(svg) {
	width: 1.5em;
	height: 1.5em;
}
</style>
