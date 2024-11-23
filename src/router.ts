import Home from './pages/home.vue';
import Link from './pages/link/main.vue';
import Project from './pages/project.vue';
import NotFound from './pages/notFound.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/link',
		name: 'Link',
		component: Link,
	},
	{
		path: '/project',
		name: 'Project',
		component: Project,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
