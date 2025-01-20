import { strapiFetch, baseUrl } from '@/lib/clients/strapi/config'
import {
    transformCategory,
    transformPage,
    transformPost,
    transformTag
} from '@/lib/clients/strapi/transform'
import { Tag } from '@/types/types'

import type {
    StrapiCategory,
    StrapiTag,
    StrapiPost,
    StrapiPage
} from './strapiTypes'
import type { CMSClient } from '@/lib/clients/types'

export const createStrapiClient = (): CMSClient => ({
    getAllPosts: async () => {
        const url = `${baseUrl}/api/posts?populate=*&sort=publishedAt:desc`

        const data = await strapiFetch<StrapiPost[]>(url, [])

        return data ? data.map(post => transformPost(post)) : []
    },
    getPost: async (slug: string) => {
        const url = `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`

        const data = await strapiFetch<StrapiPost[]>(url, [])

        return data && data.length > 0 ? transformPost(data[0]) : null
    },
    getAllPages: async () => {
        const url = `${baseUrl}/api/pages?populate=*`

        const data = await strapiFetch<StrapiPage[]>(url, [])

        return data ? data.map(page => transformPage(page)) : []
    },
    getPage: async (slug: string) => {
        const url = `${baseUrl}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`

        const data = await strapiFetch<StrapiPage[]>(url, [])

        return data && data.length > 0 ? transformPage(data[0]) : null
    },

    getCategory: async (slug: string) => {
        const url = `${baseUrl}/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`

        const data = await strapiFetch<StrapiCategory[]>(url, [])

        return data && data.length > 0 ? transformCategory(data[0]) : null
    },

    getPostsByCategory: async (slug: string) => {
        const url = `${baseUrl}/api/posts?filters[categories][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

        const data = await strapiFetch<StrapiPost[]>(url, [])

        return data ? data.map(post => transformPost(post)) : []
    },

    getCategories: async () => {
        const url = `${baseUrl}/api/categories?populate=*`

        const data = await strapiFetch<StrapiCategory[]>(url, [])

        return data ? data.map(category => transformCategory(category)) : []
    },

    getPostsByTag: async (slug: string) => {
        const url = `${baseUrl}/api/posts?filters[tags][slug][$eq]=${encodeURIComponent(slug)}&populate=*`

        const data = await strapiFetch<StrapiPost[]>(url, [])

        return data ? data.map(post => transformPost(post)) : []
    },

    getTags: async () => {
        const url = `${baseUrl}/api/tags?populate=*`

        const data = await strapiFetch<StrapiTag[]>(url, [])

        return data ? data.map(tag => transformTag(tag)) : []
    },

    getRelatedPosts: async (tags: Tag[], excludedSlug: string) => {
        if (tags.length === 0) return []

        const tagsSlugs = Array.from(new Set(tags.map(tag => tag.slug)))

        const tagsQuery = tagsSlugs
            .map(
                (tag, index) =>
                    `filters[tags][slug][$in][${index}]=${encodeURIComponent(tag)}`
            )
            .join('&')

        const url = `${baseUrl}/api/posts?filters[slug][$ne]=${encodeURIComponent(excludedSlug)}&${tagsQuery}&populate=*`

        const data = await strapiFetch<StrapiPost[]>(url, [])
        return data ? data.map(post => transformPost(post)) : []
    }
})
