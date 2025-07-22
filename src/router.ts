import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home", webpackPrefetch: true */ './pages/home/main.vue'),
		meta: { title: '首页' },
	},
	{
		path: '/link',
		name: 'Link',
		component: () => import(/* webpackChunkName: "link" */ './pages/link/main.vue'),
		meta: { title: '友谊链接' },
	},
	{
		path: '/project',
		name: 'Project',
		component: () => import(/* webpackChunkName: "project" */ './pages/project.vue'),
		meta: { title: '当前项目' },
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import(/* webpackChunkName: "404" */ './pages/notFound.vue'),
		meta: { title: '404' },
	},
] satisfies RouteRecordRaw[];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const subTitle = to.meta.title;
	if (subTitle) {
		document.title = `锐冰 - ${subTitle}`;
	}
	next();
});

export default router;
