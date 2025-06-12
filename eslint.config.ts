import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	...pluginVue.configs['flat/recommended'],
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				sourceType: 'module',
				ecmaVersion: 'latest',
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': 'off',
		},
	},
	{
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		ignores: ['**/node_modules/**', '**/dist'],
	},
);
