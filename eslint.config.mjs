import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

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
    {
        rules: {
            '@next/next/no-img-element': 'off',
            '@next/next/no-html-link-for-pages': 'off',
            'react/no-unescaped-entities': 'off',
            '@next/next/no-page-custom-font': 'off'
        }
    }
]

export default rules
