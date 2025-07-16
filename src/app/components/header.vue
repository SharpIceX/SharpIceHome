<template>
	<header class="my-8 flex justify-center">
		<nav class="advanced-blur-backdrop">
			<ul class="nav-link flex flex-row items-center justify-center">
				<li>
					<router-link class="nav-link" to="/" exact-active-class="nav-link-active"> 首页 </router-link>
				</li>
				<li>
					<router-link class="nav-link" to="/project" exact-active-class="nav-link-active">
						相关项目
					</router-link>
				</li>
				<li>
					<router-link class="nav-link" to="/link" exact-active-class="nav-link-active">
						友谊链接
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'AppHeader',
};
</script>

<style lang="less" scoped>
@import 'nord/src/lesscss/nord.less';

.nav-link {
	li {
		@apply p-4;

		// 悬浮效果
		transition: color 0.3s ease;
		&:hover {
			color: theme('colors.nord10');
		}
	}
}
.nav-link-active {
	@apply inline-flex items-center justify-center;

	position: relative;

	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -0.3rem;
		width: 100%;
		height: 4px;
		background-color: @nord9;

		animation: nav-link-active 0.5s ease-in-out forwards;
		@keyframes nav-link-active {
			from {
				width: 0;
			}
			to {
				width: 100%;
			}
		}
	}
}
</style>
