import { pages } from '@/data/pages'
import { posts } from '@/data/posts'
import { Category, Tag } from '@/types/types'

import type { CMSClient } from '@/lib/clients/types'

export const createJSONClient = (): CMSClient => {
    const extractCategories = (): Category[] => {
        const categoriesMap = new Map<string, Category>()
        posts.forEach(post => {
            post?.categories.forEach(category => {
                if (!categoriesMap.has(category.slug)) {
                    categoriesMap.set(category.slug, category)
                }
            })
        })
        return Array.from(categoriesMap.values())
    }

    const extractTags = (): Tag[] => {
        const tagsMap = new Map<string, Tag>()
        posts.forEach(post => {
            post.tags.forEach(tag => {
                if (!tagsMap.has(tag.slug)) {
                    tagsMap.set(tag.slug, tag)
                }
            })
        })
        return Array.from(tagsMap.values())
    }

    return {
        getAllPosts: async () => posts,
        getPost: async (slug: string) =>
            posts.find(post => post.slug === slug) ?? null,
        getCategory: async (slug: string) => {
            const categories = extractCategories()
            return categories.find(category => category.slug === slug) ?? null
        },
        getPostsByCategory: async (slug: string) =>
            posts.filter(post =>
                post.categories.some(category => category.slug === slug)
            ),
        getCategories: async () => extractCategories(),
        getPostsByTag: async (slug: string) =>
            posts.filter(post => post.tags.some(tag => tag.slug === slug)),
        getTags: async () => extractTags(),
        getRelatedPosts: async (tags: Tag[], excludeSlug: string) => {
            if (tags.length === 0) return []

            const tagsSlugs = new Set(tags.map(tag => tag.slug))

            return posts.filter(
                post =>
                    post.slug !== excludeSlug &&
                    post.tags.some(tag => tagsSlugs.has(tag.slug))
            )
        },
        getAllPages: async () => pages,
        getPage: async (slug: string) =>
            pages.find(page => page.slug === slug) ?? null
    }
}
