import tailwindNord from 'tailwind-nord';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{vue,ts}', './template/**/*.html'],
	plugins: [tailwindNord],
} satisfies Config;
