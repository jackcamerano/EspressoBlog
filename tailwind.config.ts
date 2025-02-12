import typography from '@tailwindcss/typography'
import svgToDataUri from 'mini-svg-data-uri'
import plugin from 'tailwindcss/plugin'
import tailwindcssAnimate from 'tailwindcss-animate'

import type { Config } from 'tailwindcss/types/config'

const flattenColors = (
    colors: Record<string, string> | Record<string, unknown>
): Record<string, string> => {
    const result: Record<string, string> = {}

    for (const [key, value] of Object.entries(colors)) {
        if (typeof value === 'string') {
            result[key] = value
        } else if (value && typeof value === 'object') {
            const nested = flattenColors(value as Record<string, unknown>)

            for (const [nestedKey, nestedValue] of Object.entries(nested)) {
                result[`${key}-${nestedKey}`] = nestedValue
            }
        }
    }

    return result
}

const addVariablesForColors = plugin(function ({ addBase, theme }) {
    const allColors = flattenColors(theme('colors'))

    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    )

    addBase({
        ':root': newVars
    })
})

const addCustomBgUtilities = plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
        {
            'bg-grid': value => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                width="32" height="32" fill="none" stroke="${value}">
             <path d="M0 .5H31.5V32" />
           </svg>`
                )}")`
            }),
            'bg-grid-small': value => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                width="8" height="8" fill="none" stroke="${value}">
             <path d="M0 .5H31.5V32" />
           </svg>`
                )}")`
            }),
            'bg-dot': value => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                width="16" height="16" fill="none">
             <circle fill="${value}" cx="10" cy="10" r="1.62574"></circle>
           </svg>`
                )}")`
            })
        },
        {
            values: flattenColors(theme('backgroundColor')),
            type: 'color'
        }
    )
})

const config: Config = {
    darkMode: ['class'],
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))'
                }
            }
        }
    },
    plugins: [
        typography,
        tailwindcssAnimate,
        addVariablesForColors,
        addCustomBgUtilities
    ]
}

export default config
