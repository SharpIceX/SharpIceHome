declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '*.svg' {
	import type { ComponentType } from 'svg-to-vue-loader';
	export default ComponentType;
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
