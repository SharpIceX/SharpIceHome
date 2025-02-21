import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('./pages/home/main.vue'),
	},
	{
		path: '/link',
		name: 'Link',
		component: () => import('./pages/link/main.vue'),
	},
	{
		path: '/project',
		name: 'Project',
		component: () => import('./pages/project.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('./pages/notFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
