import {
    strapiFetch,
    baseUrl,
    fetchAndTransform,
    fetchAndTransformSingle
} from '@/lib/clients/strapi/config'
import {
    transformCategory,
    transformMenuItem,
    transformPage,
    transformPost,
    transformSocialLinks,
    transformTag
} from '@/lib/clients/strapi/transform'
import { Tag } from '@/types/types'

import type { StrapiMenu, StrapiSocialLinks } from './strapiTypes'
import type { CMSClient } from '@/lib/clients/types'

export const createStrapiClient = (): CMSClient => ({
    getAllPosts: async () =>
        fetchAndTransform(
            `${baseUrl}/api/posts?populate=*&sort=publishedAt:desc`,
            transformPost
        ),

    getPost: async (slug: string) =>
        fetchAndTransformSingle(
            `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
            transformPost
        ),

    getAllPages: async () =>
        fetchAndTransform(`${baseUrl}/api/pages?populate=*`, transformPage),

    getPage: async (slug: string) =>
        fetchAndTransformSingle(
            `${baseUrl}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
            transformPage
        ),

    getCategory: async (slug: string) =>
        fetchAndTransformSingle(
            `${baseUrl}/api/categories?filters[slug][$eq]=${encodeURIComponent(slug)}`,
            transformCategory
        ),

    getPostsByCategory: async (slug: string) =>
        fetchAndTransform(
            `${baseUrl}/api/posts?filters[categories][slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
            transformPost
        ),

    getCategories: async () =>
        fetchAndTransform(
            `${baseUrl}/api/categories?populate=*`,
            transformCategory
        ),

    getPostsByTag: async (slug: string) =>
        fetchAndTransform(
            `${baseUrl}/api/posts?filters[tags][slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
            transformPost
        ),

    getTags: async () =>
        fetchAndTransform(`${baseUrl}/api/tags?populate=*`, transformTag),

    getRelatedPosts: async (
        tags: Tag[],
        excludedSlug: string,
        maxRelatedPosts: number
    ) => {
        if (tags.length === 0) return []

        const tagsSlugs = Array.from(new Set(tags.map(tag => tag.slug)))
        const tagsQuery = tagsSlugs
            .map(
                (tag, index) =>
                    `filters[tags][slug][$in][${index}]=${encodeURIComponent(tag)}`
            )
            .join('&')

        const url = `${baseUrl}/api/posts?filters[slug][$ne]=${encodeURIComponent(
            excludedSlug
        )}&${tagsQuery}&populate=*&pagination[limit]=${maxRelatedPosts}&sort=publishedAt:desc`

        return fetchAndTransform(url, transformPost)
    },

    getMenu: async () => {
        const url = `${baseUrl}/api/menu?populate=*`
        const data = await strapiFetch<StrapiMenu>(url)
        return data ? data?.menu_item.map(transformMenuItem) : []
    },

    getSocialLinks: async () => {
        const url = `${baseUrl}/api/social-link`
        const data = await strapiFetch<StrapiSocialLinks | null>(url)
        return transformSocialLinks(data)
    }
})
