<template>
	<div class="space-y-2">
		<div class="flex items-center space-x-1">
			<img src="/favicon.webp" title="SharpIce" alt="SharpIce的个人头像" width="40" height="40" />
			<h1 class="text-2xl">锐冰</h1>
		</div>
		<div class="pl-4">
			<h2 class="text-sm">Name: SharpIce</h2>
			<h3 class="text-sm">Description: 世界很大，只是我的知识有限，但我会继续学习的。</h3>
			<ul class="flex space-x-2 max-[450px]:flex-wrap max-[450px]:justify-center">
				<li class="flex items-center space-x-1">
					<favoriteBorderIcon aria-hidden="true" />
					<span>幻想生物（Fox）</span>
				</li>
				<li class="separation" aria-hidden="true"></li>
				<li class="flex items-center space-x-1">
					<codeIcon aria-hidden="true" />
					<span>前端开发者</span>
				</li>
				<li class="separation" aria-hidden="true"></li>
				<li class="flex items-center space-x-1">
					<codeIcon aria-hidden="true" />
					<span>C#.NET</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import codeIcon from '@fortawesome/fontawesome-free/svgs/solid/code.svg';
import favoriteBorderIcon from '@material-design-icons/svg/round/favorite_border.svg';

export default {
	name: 'InfoComponent',
	components: {
		codeIcon,
		favoriteBorderIcon,
	},
};
</script>
