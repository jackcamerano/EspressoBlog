import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

const rules = [
    {
        ignores: [
            '**/.next',
            '**/.cache',
            '**/package-lock.json',
            '**/public',
            '**/node_modules',
            '**/next-env.d.ts',
            '**/next.config.ts',
            '**/yarn.lock'
        ]
    },
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.extends('plugin:import/recommended'),
    {
        rules: {
            '@next/next/no-img-element': 'off',
            '@next/next/no-html-link-for-pages': 'off',
            'react/no-unescaped-entities': 'off',
            '@next/next/no-page-custom-font': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/numeric-separators-style': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'type'
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always'
                }
            ]
        }
    },
    {
        plugins: { unicorn: eslintPluginUnicorn, import: importPlugin }
    }
]

export default rules
