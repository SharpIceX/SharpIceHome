<template>
	<!-- 背景 -->
	<div class="bg bg-copyright-info advanced-blur-before"></div>

	<!-- 游戏推荐小组件 -->
	<gameRecommendWidgets />

	<!-- 页面 -->
	<router-view class="opacity-animation"></router-view>

	<nav class="flex justify-center p-2">
		<ul class="flex space-x-3">
			<li class="nav-item">
				<router-link to="/">首页</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/project">相关项目</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/link">亲朋好友们</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import gameRecommendWidgets from './widgets/gameRecommend.vue';

export default {
	name: 'App',
	components: {
		gameRecommendWidgets,
	},
};
</script>

<style lang="less" scoped>
.opacity-animation {
	animation: opacity 0.7s ease-in-out;

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}

.bg::before {
	@apply h-screen w-screen;
	@apply fixed left-0 top-0;
	content: '';
	z-index: -1;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url('@kde/plasma-workspace-wallpapers/Patak/contents/images_dark/3840x2160.png');
	opacity: 0;
	animation: fadeIn 2s ease-in-out forwards;

	@keyframes fadeIn {
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}

.bg-copyright-info {
	// 右下角固定显示文字，使用原生 CSS和content
	&::after {
		content: '壁纸：KDE Plasma · License: LGPL-3.0';
		@apply fixed bottom-0 right-0;
		@apply text-lg text-nord-8 text-opacity-50 p-2;
	}
}

.nav-item {
	@apply text-nord-8 select-none;

	&:hover {
		@keyframes identifier {
			0% {
				@apply text-nord-8;
			}
			100% {
				@apply text-nord10;
			}
		}

		animation: identifier 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
}
</style>
