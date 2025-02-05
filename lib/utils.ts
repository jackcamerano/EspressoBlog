import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export const classNames = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
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
