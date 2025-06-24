declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '*.svg' {
	import type { componentType } from 'svg-to-vue-loader';
	export default componentType;
}

declare module '*.png' {
	const value: string;
	export default value;
}

declare module '*.webp' {
	const value: string;
	export default value;
}

declare module 'tailwind-nord' {
	import type { PluginCreator } from 'tailwindcss/types/config';
	const tailwindNord: PluginCreator;
	export default tailwindNord;
}
