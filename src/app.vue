<template>
	<div class="bg advanced-blur-before"></div>
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
				<router-link to="/link">亲友们</router-link>
			</li>
		</ul>
	</nav>
</template>

<style lang="less" scoped>
.opacity-animation {
	animation: opacity 0.8s;

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
	background-image: url('/background.webp');
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

.nav-item {
	@apply text-nord-8 hover:text-nord-9;
}
</style>
