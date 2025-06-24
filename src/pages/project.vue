<template>
	<main>
		<ul class="w flex w-[88rem] flex-wrap justify-center gap-8 max-lg:w-auto max-lg:flex-col">
			<li :class="projectCardClass">
				<h1>postcss-remove-format-fonts</h1>
				<p>一个简单的postcss插件，用于删除特定格式的字体。</p>
				<nav aria-label="项目链接">
					<ul>
						<li>
							<a href="https://www.npmjs.com/package/postcss-remove-format-fonts">
								<npmIcon size="24" alt="NPM 包链接" />
							</a>
							<a href="https://github.com/FurryRbl/postcss-remove-format-fonts">
								<gitubIcon size="24" alt="GitHub 存储库链接" />
							</a>
						</li>
					</ul>
				</nav>
			</li>
			<li :class="projectCardClass">
				<h1>svg-to-vue-loader</h1>
				<p>将svg动态转化为Vue3组件的Webpack Loader。</p>
				<nav aria-label="项目链接">
					<ul>
						<li>
							<a href="https://www.npmjs.com/package/svg-to-vue-loader">
								<npmIcon size="24" alt="NPM 包链接" />
							</a>
							<a href="https://github.com/FurryRbl/svg-to-vue-loader">
								<gitubIcon size="24" alt="GitHub 存储库链接" />
							</a>
						</li>
					</ul>
				</nav>
			</li>
		</ul>
	</main>
</template>

<script>
import npmIcon from 'material-icon-theme/icons/npm.svg';
import gitubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';

export default {
	name: 'ProjectPages',
	components: {
		npmIcon,
		gitubIcon,
	},
	data() {
		return {
			projectCardClass: 'project-card advanced-blur-backdrop',
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
}
</style>
