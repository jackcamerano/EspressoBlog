import { menuItems } from '@/data/menu'
import { pages } from '@/data/pages'
import { posts } from '@/data/posts'
import { socialLinks } from '@/data/socialLinks'
import { Category, Tag } from '@/types/types'

import type { CMSClient } from '@/lib/clients/types'

export const createJSONClient = (): CMSClient => {
    const categoriesCache = new Map<string, Category>()

    const extractCategories = (): Category[] => {
        if (categoriesCache.size > 0) {
            return Array.from(categoriesCache.values())
        }
        const categoriesMap = new Map<string, Category>()
        posts.forEach(post => {
            post?.categories.forEach(category => {
                if (!categoriesMap.has(category.slug)) {
                    categoriesMap.set(category.slug, category)
                    categoriesCache.set(category.slug, category)
                }
            })
        })
        return Array.from(categoriesMap.values())
    }

    const tagsCache = new Map<string, Tag>()
    const extractTags = (): Tag[] => {
        if (tagsCache.size > 0) {
            return Array.from(tagsCache.values())
        }
        const tagsMap = new Map<string, Tag>()
        posts.forEach(post => {
            post.tags.forEach(tag => {
                if (!tagsMap.has(tag.slug)) {
                    tagsMap.set(tag.slug, tag)
                    tagsCache.set(tag.slug, tag)
                }
            })
        })
        return Array.from(tagsMap.values())
    }

    return {
        getAllPosts: async () =>
            [...posts]
                .filter(Boolean)
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                ),

        getPost: async (slug: string) =>
            !slug ? null : (posts.find(post => post.slug === slug) ?? null),
        getCategory: async (slug: string) =>
            !slug
                ? null
                : (extractCategories().find(
                      category => category.slug === slug
                  ) ?? null),
        getPostsByCategory: async (slug: string) =>
            !slug
                ? []
                : posts.filter(post =>
                      post.categories.some(category => category.slug === slug)
                  ),
        getCategories: async () => extractCategories(),
        getPostsByTag: async (slug: string) =>
            !slug
                ? []
                : posts.filter(post =>
                      post.tags.some(tag => tag.slug === slug)
                  ),
        getTags: async () => extractTags(),
        getRelatedPosts: async (
            tags: Tag[],
            excludeSlug: string,
            maxRelatedPosts: number
        ) => {
            if (tags.length === 0) return []

            const tagsSlugs = new Set(tags.map(tag => tag.slug))

            return posts
                .filter(
                    post =>
                        post.slug !== excludeSlug &&
                        post.tags.some(tag => tagsSlugs.has(tag.slug))
                )
                .slice(0, maxRelatedPosts)
        },
        getAllPages: async () => pages,
        getPage: async (slug: string) =>
            !slug ? null : (pages.find(page => page.slug === slug) ?? null),
        getMenu: async () => {
            return menuItems ?? []
        },
        getSocialLinks: async () => {
            return socialLinks
        }
    }
}
