import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ './pages/home/main.vue'),
	},
	{
		path: '/link',
		name: 'Link',
		component: () => import(/* webpackChunkName: "link" */ './pages/link/main.vue'),
	},
	{
		path: '/project',
		name: 'Project',
		component: () => import(/* webpackChunkName: "project" */ './pages/project.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import(/* webpackChunkName: "not-found" */ './pages/notFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
