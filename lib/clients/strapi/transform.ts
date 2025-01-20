import type {
    StrapiCategory,
    StrapiTag,
    StrapiPost,
    StrapiPage,
    StrapiImage,
    StrapiAuthor
} from './strapiTypes'
import type { Category, Page, Post, Tag, Author, Image } from '@/types/types'

export const transformImage = (strapiImage: StrapiImage): Image => ({
    name: strapiImage.name,
    url: strapiImage.url,
    alternativeText: strapiImage.alternativeText || undefined
})

export const transformAuthor = (strapiAuthor: StrapiAuthor): Author => ({
    name: strapiAuthor.name,
    image: strapiAuthor.image ? transformImage(strapiAuthor.image) : undefined
})

export const transformTag = (strapiTag: StrapiTag): Tag => ({
    name: strapiTag.name,
    slug: strapiTag.slug
})

export const transformCategory = (
    strapiCategory: StrapiCategory
): Category => ({
    name: strapiCategory.name,
    slug: strapiCategory.slug
})

export const transformPage = (strapiPage: StrapiPage): Page => ({
    title: strapiPage.title,
    description: strapiPage.description,
    featuredImage: strapiPage.featuredImage
        ? transformImage(strapiPage.featuredImage)
        : undefined,
    author: transformAuthor(strapiPage.createdBy),
    slug: strapiPage.slug,
    date: strapiPage.publishedAt,
    content: strapiPage.content
})

export const transformPost = (strapiPost: StrapiPost): Post => ({
    title: strapiPost.title,
    description: strapiPost.description,
    featuredImage: strapiPost.featuredImage
        ? transformImage(strapiPost.featuredImage)
        : undefined,
    author: transformAuthor(strapiPost.createdBy),
    slug: strapiPost.slug,
    date: strapiPost.publishedAt,
    content: strapiPost.content,
    tags: strapiPost.tags.map((tag: StrapiTag) => transformTag(tag)),
    categories: strapiPost.categories.map((category: StrapiCategory) =>
        transformCategory(category)
    )
})
