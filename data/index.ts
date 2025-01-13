import { config } from '@/next.config'

import type { Category, Page, Post, Tag } from '@/types'

const token = config.STRAPI_API_TOKEN
const baseUrl = config.STRAPI_API_URL

interface StrapiResponse<T> {
    data?: T
    [key: string]: unknown
}

const strapiFetch = async <T>(url: string, defaultValue: T): Promise<T> => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        console.error(`Strapi fetch failed: ${res.status} ${res.statusText}`)
        return defaultValue
    }

    const json = (await res.json()) as StrapiResponse<T>
    return json.data ?? defaultValue
}

// Home Page
export const getAllPosts = async () => {
    const url = `${baseUrl}/api/posts?populate=*&sort=publishedAt:desc`

    return await strapiFetch<Post[]>(url, [])
}

// Read page
export const getPost = async (slug: string) => {
    const url = `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return (await strapiFetch<Post[]>(url, []))[0] ?? null
}

// Category page
export const getCategory = async (slug: string) => {
    const url = `${baseUrl}/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`

    return (await strapiFetch<Category[]>(url, []))[0] ?? null
}

// Category Page
export const getPostsByCategory = async (slug: string) => {
    const url = `${baseUrl}/api/posts?filters[categories][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return await strapiFetch<Post[]>(url, [])
}

// Category Page
export const getCategories = async () => {
    const url = `${baseUrl}/api/categories?populate=*`

    return await strapiFetch<Category[]>(url, [])
}

// Tag Page
export const getPostsByTag = async (slug: string) => {
    const url = `${baseUrl}/api/posts?filters[tags][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return await strapiFetch<Post[]>(url, [])
}

// Tag Page
export const GetTags = async () => {
    const url = `${baseUrl}/api/tags?populate=*`

    return await strapiFetch<Tag[]>(url, [])
}

export const getRelatedPosts = async (tag: string, slug: string) => {
    const url = `${baseUrl}/api/posts?filters[slug][$ne]=${encodeURIComponent(
        slug
    )}&filters[tags][slug][$eq]=${encodeURIComponent(tag)}&populate=*`

    return await strapiFetch<Post[]>(url, [])
}

export const getAllPages = async () => {
    const url = `${baseUrl}/api/pages?populate=*`

    return await strapiFetch<Page[]>(url, [])
}

export const getPage = async (slug: string) => {
    const url = `${baseUrl}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return (await strapiFetch<Page[]>(url, []))[0] ?? null
}
