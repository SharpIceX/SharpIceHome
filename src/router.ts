import AboutPage from './pages/about.vue';
import NotFound from './pages/notFound.vue';
import HomePage from './pages/home/main.vue';
import LinkPage from './pages/link/main.vue';
import ProjectPage from './pages/project.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
		meta: { title: '首页' },
	},
	{
		path: '/project',
		name: 'Project',
		component: ProjectPage,
		meta: { title: '当前项目' },
	},
	{
		path: '/link',
		name: 'Link',
		component: LinkPage,
		meta: { title: '友谊链接' },
	},
	{
		path: '/about',
		name: 'about',
		component: AboutPage,
		meta: { title: '关于我' },
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
		meta: { title: '页面未找到' },
	},
] satisfies RouteRecordRaw[];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _from, next) => {
	const subTitle = to.meta.title;
	if (subTitle) {
		document.title = `锐冰 - ${subTitle}`;
	}
	next();
});

if (__DEV__) {
	// 开始加载时触发
	router.beforeEach((to, _from, next) => {
		console.log('开始加载页面:', to.fullPath);
		next();
	});

	// 结束时触发
	router.afterEach(to => {
		console.log('页面加载完成', to.fullPath);
	});
}

export default router;
