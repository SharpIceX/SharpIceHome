import globals from 'globals';
import eslint from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
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
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': ['off', 'always'],
		},
		ignores: ['node_modules', '/dist'],
	},
	{
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		languageOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: import.meta.dirname,
			globals: {
				...globals['shared-node-browser'],
			},
		},
	},
);
