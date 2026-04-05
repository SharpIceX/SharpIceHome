<template>
	<div class="home-wrapper">
		<div class="home-container">
			<h1 class="name">
				<span class="greeting">你好，</span>
				<span class="intro">我是</span>
				<span class="identity">锐冰</span>
				<featherPointedIcon class="icon" />
			</h1>
			<p class="info">
				<span class="label">关于我</span>
				<span class="content">
					我是一名（应用层）基础设施开发者、开源志愿者、架空世界观创作者，我喜欢可爱的艺术作作品。目前主要为开源项目贡献简体中文本地化，以及维护
					<a href="https://github.com/SharpIceX/ThaumaturgySpectacle" target="_blank">ThaumaturgySpectacle</a>
					、
					<a href="https://github.com/SharpIceX/nuxt-nexus" target="_blank">Nuxt Nexus</a>
					等项目。
				</span>
			</p>
			<HorizontaLlist :list="connectList" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { HorizontaLlist } from '#components';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import discordIcon from '@fortawesome/fontawesome-free/svgs/brands/discord.svg';
import envelopeIcon from '@fortawesome/fontawesome-free/svgs/solid/envelope.svg';
import bilibiliIcon from '@fortawesome/fontawesome-free/svgs/brands/bilibili.svg';
import featherPointedIcon from '@fortawesome/fontawesome-free/svgs/solid/feather-pointed.svg';

useSeoMeta({
	title: '首页',
});

const connectList: ComponentProps<typeof HorizontaLlist>['list'] = [
	{ name: 'GitHub', icon: markRaw(gitubIcon), url: 'https://github.com/SharpIceX' },
	{ name: 'BiliBili', icon: markRaw(bilibiliIcon), url: 'https://space.bilibili.com/513364639' },
	{ name: 'Discord', icon: markRaw(discordIcon), url: 'https://discord.com/users/650534063492431891' },
	{ name: 'Email', icon: markRaw(envelopeIcon), url: 'mailto:SharpIce@SharpIce.top' },
];
</script>

<style lang="less" scoped>
@import (reference) '~/styles/color.less';

.home-wrapper {
	height: 100%;
	display: flex;
	padding: 1rem;
	align-items: center;
	justify-content: center;

	.home-container {
		width: 36%;
		display: flex;
		line-break: strict;
		flex-direction: column;
		overflow-wrap: break-word;
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		.home-container {
			width: 100%;
		}
	}
}

.name {
	font-weight: 400;
	padding-left: 5rem;

	.greeting {
		font-size: 1.3rem;
	}

	.intro {
		font-size: 1.7rem;
	}

	.identity {
		font-size: 2.1rem;
		position: relative;
		&::after {
			right: 0;
			width: 80%;
			content: '';
			height: 3px;
			transform: none;
			bottom: -0.5rem;
			position: absolute;
			border-radius: 2px;
			background-color: @fantasy-accent-soft;
			box-shadow: 0 0 8px @fantasy-glow-color;
		}
	}

	.icon {
		width: 2rem;
		height: 2rem;
		margin-left: 1rem;
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		width: 100%;
	}
}

.info {
	gap: 1.3rem;
	display: flex;
	justify-content: center;

	.label {
		flex-shrink: 0;
		font-size: 1.3rem;
		white-space: nowrap;
	}

	.content {
		font-size: 0.9em;
		color: @fantasy-text-muted;

		a {
			display: inline-block;
			color: @fantasy-accent-soft;
		}
	}

	// # 小屏幕
	@media (max-width: 1024px) {
		flex-direction: column;
	}
}
</style>
