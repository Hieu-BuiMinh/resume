// https://github.dev/sonsu95/next15-eslint9-template/

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
// import * as tailwindcss from 'eslint-plugin-tailwindcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'dist/**',
			'postcss.config.mjs',
			'components/ui/*',
			'**/tailwind.config.ts',
			'convex/_generated/*',
			'.velite',
		],
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
			},
			globals: {
				browser: true,
				es2022: true,
				node: true,
			},
		},
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			prettier: eslintPluginPrettier,
			simpleImportSort,
			// tailwindcss,
		},
		// settings: {
		// 	tailwindcss: {
		// 		callees: ['cn', 'clsx', 'classnames'],
		// 	},
		// },
		rules: {
			'prettier/prettier': 'warn',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			// 'prettier/classnames-order': 'warn',
			// 'prettier/no-contradicting-classname': 'error',
			// 'prettier/no-custom-classname': 'off',

			// import rules
			'simpleImportSort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
			'simpleImportSort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
			'import/order': 'off', // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
			'import/extensions': 'off', // Avoid missing file extension errors, TypeScript already provides a similar feature
			'unused-imports/no-unused-imports': 'off',

			// 'tailwindcss/classnames-order': 'warn',
			// 'tailwindcss/no-contradicting-classname': 'error',
			// 'tailwindcss/no-custom-classname': 'off',

			'react/jsx-no-undef': 'off',
		},
	},
]

export default eslintConfig
