import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export const classNames = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const getImageUrl = (url: string) =>
    new URL(url, process.env.NEXT_PUBLIC_STRAPI_API_URL).toString()

const DATE_FORMAT = 'DD MMM, YYYY'

export const formatDate = (
    date: string | Date | undefined,
    fallback: string = 'Date unavailable'
): string => {
    console.log(date)
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
