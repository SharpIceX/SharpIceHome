import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	...pluginVue.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				sourceType: 'module',
				ecmaVersion: 'latest',
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals['shared-node-browser'],
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': 'off',
		},
	},
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.vue'],
			},
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		ignores: ['**/node_modules/**', '**/dist', '**/*.d.ts'],
	},
);
