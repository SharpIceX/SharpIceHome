import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		title: string;
		tags?: string[];
		description?: string;
		type?: 'blog' | string;

		/** ISO 8601 格式，UTC+08时区 */
		time: {
			createdAt: string;
			updatedAt: string;
		};
	}
}
