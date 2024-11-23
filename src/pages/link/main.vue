<template>
	<main>
		<ul class="w flex w-[88rem] flex-wrap justify-center gap-8 max-lg:w-auto max-lg:flex-col">
			<li :class="linkCardClass">
				<a href="https://iy.ink/?ref=sharpice.top">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/whiteink.webp" />
						<div>
							<h1>白墨</h1>
							<p>白山白墨</p>
						</div>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://sothx.com/?ref=sharpice.top">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/sothx.webp" />
						<div>
							<h1>泛泛</h1>
							<p>云锦书笺</p>
						</div>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://zoxoy.club/?ref=sharpice.top">
					<div class="flex h-full flex-col justify-center space-y-1">
						<h1>飞羽</h1>
						<p>飞羽的小窝</p>
					</div>
				</a>
			</li>
			<li :class="linkCardClass">
				<a href="https://blog.sevtinge.cc/?ref=sharpice.top">
					<div class="flex flex-row items-center space-x-4">
						<img src="./avatar/sevtinge.webp" />
						<div>
							<h1>绀漓</h1>
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
			linkCardClass: ['project-card', 'advanced-blur-backdrop', 'advanced-blur-card', 'advanced-blur-card-hover'],
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

		border-radius: 50%;
	}
}
</style>
