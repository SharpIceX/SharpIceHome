import tailwindNord from 'tailwind-nord';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{vue,ts}', './template/**/*.html'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['LXGW WenKai', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [tailwindNord],
} satisfies Config;
