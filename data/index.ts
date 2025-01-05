import { posts as allPosts } from '@/data/posts'
import type { Post } from '@/types'

const token = process.env.STRAPI_API_TOKEN
const baseUrl = process.env.STRAPI_API_URL

function slugify(slug: string) {
    return slug.toLowerCase().trim().split(' ').join('-')
}

// Home Page
export async function GetAllPosts() {
    const data = await fetch(
        `${baseUrl}/api/posts?populate=*&sort=publishedAt:desc`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const strapiPosts = await data.json()
    return strapiPosts?.data || []
}

// Read page
export async function GetPost(slug: string) {
    const data = await fetch(
        `${baseUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const strapiPosts = await data.json()

    return strapiPosts?.data[0] || []
}

export function RelatedPosts(tag: string, dontInclude: string) {
    const RelatedPosts: Post[] = []

    allPosts.map(post => {
        if (post.tags) {
            post.tags.filter(item => {
                if (slugify(item) === slugify(tag)) {
                    if (dontInclude !== post.slug) {
                        RelatedPosts.push(post)
                    }
                }
            })
        }
    })
    return RelatedPosts
}

// Category page
export async function GetCategory(slug: string) {
    const data = await fetch(
        `${baseUrl}/api/categories?filters[slug][$eq]=${slug}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const strapiCategories = await data.json()

    return strapiCategories?.data[0] || []
}

// Category Page
export async function GetPostsByCategory(slug: string) {
    const data = await fetch(
        `${baseUrl}/api/posts?filters[categories][slug][$eq]=${slug}&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const strapiPosts = await data.json()

    return strapiPosts?.data || []
}

// Category Page
export async function GetCategories() {
    const CategoryList: { slug: string }[] = []

    allPosts.map(post => {
        if (post.category) {
            post.category.filter(tag => {
                const formatCategory = tag
                    .toLowerCase()
                    .trim()
                    .split(' ')
                    .join('-')
                if (formatCategory) {
                    CategoryList.push({ slug: formatCategory })
                }
            })
        }
    })
    return CategoryList
}

// Tag Page
export async function GetPostsByTag(slug: string) {
    const data = await fetch(
        `${baseUrl}/api/posts?filters[tags][slug][$eq]=${slug}&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    const strapiPosts = await data.json()

    return strapiPosts?.data || []
}

// Tag Page
export async function GetTags() {
    const TagsList: { slug: string }[] = []

    allPosts.map(post => {
        if (post.tags !== undefined) {
            post.tags.filter(tag => {
                const formatTag = tag.toLowerCase().trim().split(' ').join('-')
                if (formatTag) {
                    TagsList.push({ slug: formatTag })
                }
            })
        }
    })
    return TagsList
}
