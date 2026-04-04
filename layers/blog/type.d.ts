import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		title: string;
		tags?: string[];
		description?: string;
		time?: {
			createdAt: string;
			updatedAt: string;
		};
	}
}
