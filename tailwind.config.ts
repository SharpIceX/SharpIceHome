import tailwindNord from 'tailwind-nord';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*{vue,js}', './template/**/*.html'],
	theme: {
		fontFamily: {
			serif: ['LXGW WenKai', ...defaultTheme.fontFamily.serif],
		},
	},
	plugins: [tailwindNord],
} satisfies Config;
