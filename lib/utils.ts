import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { config } from '@/next.config'

export const classNames = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const getImageUrl = (url: string) =>
    new URL(url, config.STRAPI_API_URL).toString()
