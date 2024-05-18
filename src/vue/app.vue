<template>
	<div class="space-y-5">
		<div class="relative max-lg:scale-90">
			<div class="position-center absolute flex flex-row space-x-20 max-lg:scale-[.55]">
				<div class="glow"></div>
				<div class="glow"></div>
				<div class="glow"></div>
			</div>
			<div class="card">
				<div class="flex w-1/2 items-center justify-center max-lg:h-1/2 max-lg:w-auto">
					<div class="avatar h-2/3 w-2/3"></div>
				</div>
				<div class="flex w-1/2 flex-col items-center justify-center space-y-3 max-lg:h-1/2 max-lg:w-auto">
					<p class="text-4xl font-bold">
						<span class="text-nord3">Hi，咱叫</span>
						<span class="text-nord10">锐冰</span>
					</p>
					<p class="text-lg text-nord9">咱目前是一个前端开发者，现在正在学习后端开发，希望成为一名全栈开发者。除此之外，咱还对其他领域充满了好奇心呢！</p>
				</div>
			</div>
		</div>
		<ul class="flex flex-row flex-wrap justify-center space-x-5">
			<li>
				<a herf="https://blog.sharpice.top" class="icon">
					<span>
						<font-awesome-icon icon="fa-solid fa-newspaper" />
					</span>
					<span>个人博客</span>
				</a>
			</li>
			<li>
				<a herf="https://github.com/FurryRbl" class="icon">
					<span>
						<font-awesome-icon icon="fa-brands fa-github" />
					</span>
					<span>Github</span>
				</a>
			</li>
			<li>
				<a herf="https://space.bilibili.com/513364639" class="icon">
					<span>
						<font-awesome-icon icon="fa-brands fa-bilibili" />
					</span>
					<span>哔哩哔哩</span>
				</a>
			</li>
			<li>
				<a herf="https://www.zhihu.com/people/rui-bing-long" class="icon">
					<span>
						<font-awesome-icon icon="fa-brands fa-zhihu" />
					</span>
					<span>知乎</span>
				</a>
			</li>
			<li>
				<a herf="mailto:SharpIce@SharpIce.top" class="icon">
					<span>
						<font-awesome-icon icon="fa-solid fa-envelope" />
					</span>
					<span>邮件</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="less">
.icon {
	@apply flex flex-row items-center space-x-2 text-xl text-nord3;

	svg {
		@apply text-3xl;
	}

	&:hover {
		@apply text-nord8;
	}
}

.glow {
	width: 9rem;
	height: 24rem;
	transform: skew(-20deg);
	background: linear-gradient(120deg, #6cb4fe 80px, #ffff00, #926cff 220px);
	box-shadow:
		0 0 10px rgba(255, 180, 0, 0.5),
		0 0 20px rgba(255, 180, 0, 0.5),
		0 0 30px rgba(255, 180, 0, 0.5);
}

.avatar {
	@apply bg-cover bg-center;
	background-image: url("/public/favicon.png");
}

.card {
	@apply border border-nord3; /* 边框 */
	@apply shadow-lg shadow-nord1; /* 阴影 */
	@apply bg-white bg-opacity-10; /* 背景 */
	@apply flex flex-row rounded-3xl p-6 max-lg:flex-col; /* 圆角、内边距 */
	@apply transition-transform duration-300 hover:scale-110; /* 鼠标悬停时放大动效 */

	/* 宽高 */
	height: 27rem;
	width: 48rem;

	@media (max-width: 1023px) {
		height: 48rem;
		width: 27rem;
	}

	/* 背景动效 */
	&:hover {
		animation: hoverBackground 0.3s ease-in-out forwards;
	}

	@keyframes hoverBackground {
		0% {
			@apply backdrop-blur-sm backdrop-brightness-90;
		}

		100% {
			@apply backdrop-blur-xl backdrop-brightness-75;
		}
	}

	&:not(:hover) {
		animation: notBackground 0.3s ease-in-out forwards;
	}

	@keyframes notBackground {
		0% {
			@apply backdrop-blur-xl backdrop-brightness-75;
		}

		100% {
			@apply backdrop-blur-sm backdrop-brightness-90;
		}
	}
}
</style>
