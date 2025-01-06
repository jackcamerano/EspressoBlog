import type { Category, Post, Tag } from '@/types'

const token = process.env.STRAPI_API_TOKEN
const baseUrl = process.env.STRAPI_API_URL

interface StrapiResponse<T> {
    data?: T
    [key: string]: unknown
}

async function strapiFetch<T>(url: string, defaultValue: T): Promise<T> {
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
export async function getAllPosts() {
    const url = `${baseUrl}/api/posts?populate=*&sort=publishedAt:desc`

    return await strapiFetch<Post[]>(url, [])
}

// Read page
export async function getPost(slug: string) {
    const url = `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return (await strapiFetch<Post[]>(url, []))[0] ?? null
}

// Category page
export async function getCategory(slug: string) {
    const url = `${baseUrl}/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`

    return (await strapiFetch<Category[]>(url, []))[0] ?? null
}

// Category Page
export async function getPostsByCategory(slug: string) {
    const url = `${baseUrl}/api/posts?filters[categories][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return await strapiFetch<Post[]>(url, [])
}

// Category Page
export async function getCategories() {
    const url = `${baseUrl}/api/categories?populate=*`

    return await strapiFetch<Category[]>(url, [])
}

// Tag Page
export async function getPostsByTag(slug: string) {
    const url = `${baseUrl}/api/posts?filters[tags][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

    return await strapiFetch<Post[]>(url, [])
}

// Tag Page
export async function GetTags() {
    const url = `${baseUrl}/api/tags?populate=*`

    return await strapiFetch<Tag[]>(url, [])
}
