<template>
	<div class="flex flex-row flex-wrap justify-center space-x-4">
		<a class="link-item" href="https://blog.sharpice.top">
			<Rss_FeedIcon aria-hidden="true" />
			<span>个人博客</span>
		</a>
		<a class="link-item" href="https://github.com/FurryRbl">
			<gitubIcon aria-hidden="true" />
			<span>GitHub</span>
		</a>
		<a class="link-item" href="https://space.bilibili.com/513364639">
			<bilibiliIcon aria-hidden="true" />
			<span>哔哩哔哩</span>
		</a>
		<a class="link-item" href="https://zhihu.com/people/SharpIce">知乎</a>
		<a class="link-item" href="mailto:SharpIce@SharpIce.top">
			<emailIcon aria-hidden="true" />
			<span>邮件</span>
		</a>
	</div>
</template>

<script>
import emailIcon from 'material-icon-theme/icons/email.svg';
import Rss_FeedIcon from '@material-design-icons/svg/round/rss_feed.svg';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import bilibiliIcon from '@fortawesome/fontawesome-free/svgs/brands/bilibili.svg';

export default {
	name: 'FindMeComponent',
	components: {
		emailIcon,
		gitubIcon,
		Rss_FeedIcon,
		bilibiliIcon,
	},
};
</script>

<style lang="less" scoped>
.link-item {
	@apply flex flex-row items-center space-x-1;

	&:hover {
		@keyframes identifier {
			0% {
				@apply text-nord4;
			}
			100% {
				@apply text-nord9;
			}
		}

		animation: identifier 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
}
</style>
