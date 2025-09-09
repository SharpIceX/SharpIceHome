import globals from 'globals';
import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint, { type InfiniteDepthConfigWithExtends } from 'typescript-eslint';

const TypeScriptConfig: InfiniteDepthConfigWithExtends = {
	extends: [tseslint.configs.strict, tseslint.configs.stylistic, jsdoc.configs['flat/recommended-typescript']],
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
			tsconfigRootDir: import.meta.dirname,
			projectService: {
				defaultProject: './tsconfig.eslint.json',
			},
		},
	},
};

const config: InfiniteDepthConfigWithExtends = tseslint.config(
	eslint.configs.recommended,
	eslintPluginUnicorn.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	...pluginVue.configs['flat/recommended'],
	eslintConfigPrettier,

	{
		...TypeScriptConfig,
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.vue'],
			},
		},
	},
	{
		...TypeScriptConfig,
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.vue'],
			},
		},
	},
	...(await (async () => {
		const nuxtConfigModule = await import('./.nuxt/eslint.config.mjs');
		return nuxtConfigModule.default();
	})()),
	{
		languageOptions: {
			globals: {
				...globals['shared-node-browser'],
			},
		},
		rules: {
			'vue/html-self-closing': 'off',
			eqeqeq: ['error', 'always'],
		},
	},
	{
		ignores: ['**/*.d.ts', '**/dits/**', '**/.nuxt/**', '**/node_modules/**'],
	},
);

export default config;
