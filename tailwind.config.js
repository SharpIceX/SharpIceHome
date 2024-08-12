import tailwindNord from 'tailwind-nord';

/** @type {import("tailwindcss").Config} */
export default {
	content: ['./src/**/*{vue,js}', './tools/**/*.{vue,js}', './template/**/*.html'],
	theme: {
		fontFamily: {
			LXGW: ['LXGW WenKai'],
		},
	},
	plugins: [tailwindNord],
};
