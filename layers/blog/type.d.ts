import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		title: string;
		tags?: string[];
		created_at?: string;
		updated_at?: string;
		description?: string;
	}
}
