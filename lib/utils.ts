import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export const classNames = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const getImageUrl = (url: string) => {
    if (!url) return ''
    try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
        return new URL(url, baseUrl).toString()
    } catch (error) {
        console.error('Failed to construct image URL:', error)
        return ''
    }
}

const DATE_FORMAT = 'DD MMM, YYYY'

export const formatDate = (
    date: string | Date | undefined,
    fallback: string = 'Date unavailable'
): string => {
    if (!date) {
        return fallback
    }
    try {
        return dayjs(date).format(DATE_FORMAT)
    } catch (error) {
        console.error('Failed to parse date:', error)
        return fallback
    }
}
