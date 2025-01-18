import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const classNames = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const getImageUrl = (url: string) =>
    new URL(url, process.env.NEXT_PUBLIC_STRAPI_API_URL).toString()
