import { config } from '@/env'

export const getImageUrl = (url: string) => {
    if (!url) return ''
    try {
        const { STRAPI_API_URL: baseUrl } = config
        return new URL(url, baseUrl).toString()
    } catch (error) {
        console.error('Failed to construct image URL:', error)
        return ''
    }
}
