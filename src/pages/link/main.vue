<template>
	<main>
		<ul class="flex w-[88rem] flex-wrap justify-center gap-8 max-lg:w-auto max-lg:flex-col">
			<li :class="linkCardClass">
				<a href="https://iy.ink/?ref=sharpice.top" aria-label="访问白墨的个人网站">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/whiteink.webp" title="白墨" alt="白墨的头像" />
						<div>
							<h2>白墨</h2>
							<p>白山白墨</p>
						</div>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://sothx.com/?ref=sharpice.top" aria-label="访问泛泛的个人网站">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/sothx.webp" title="泛泛" alt="泛泛的头像" />
						<div>
							<h2>泛泛</h2>
							<p>云锦书笺</p>
						</div>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://zoxoy.club/?ref=sharpice.top" aria-label="访问飞羽的个人网站">
					<div class="flex h-full flex-col justify-center space-y-1">
						<h2>飞羽</h2>
						<p>飞羽的小窝</p>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://blog.sevtinge.cc/?ref=sharpice.top" aria-label="访问绀漓的个人网站">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/sevtinge.webp" title="绀漓" alt="绀漓的头像" />
						<div>
							<h2>绀漓</h2>
							<p>锟斤拷烫烫烫</p>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</main>
</template>

<script>
export default {
	name: 'LinkPages',
	data() {
		return {
			linkCardClass: 'project-card advanced-blur-backdrop',
		};
	},
};
</script>

<style lang="less" scoped>
.project-card {
	@apply space-y-3 px-6 py-3;
	width: 20rem;

	ul li {
		@apply flex space-x-3;
	}

	h1 {
		@apply text-xl;
	}

	img {
		@apply h-20 w-20;
		@apply select-none;

		border-radius: 50%;
	}
}
</style>
