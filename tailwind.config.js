import defaultTheme from "tailwindcss/defaultTheme";
import tailwindNord from "tailwind-nord";

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*{vue,js}", "./template/**/*.html"],
	theme: {
		fontFamily: {
			serif: [
				"Noto Serif SC",
				"sans-serif",
				...defaultTheme.fontFamily.serif,
			],
		},
	},
	plugins: [tailwindNord],
};
