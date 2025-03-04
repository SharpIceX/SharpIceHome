import HomePage from './pages/home/main.vue';
import LinkPage from './pages/link/main.vue';
import ProjectPage from './pages/project.vue';
import NotFoundPage from './pages/notFound.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/link',
		name: 'Link',
		component: LinkPage,
	},
	{
		path: '/project',
		name: 'Project',
		component: ProjectPage,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
