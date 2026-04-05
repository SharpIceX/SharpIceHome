import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		title: string;
		tags?: string[];
		description?: string;
		type?: 'blog' | string;
		time: {
			createdAt: string;
			updatedAt: string;
		};
	}
}
