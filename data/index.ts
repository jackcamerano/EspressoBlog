import { posts as allPosts } from '@/data/posts'
import type { Post } from '@/types'

function slugify(slug: string) {
    return slug.toLowerCase().trim().split(' ').join('-')
}

// Home Page
export function GetAllPosts() {
    console.log(allPosts[1])
    return allPosts
}

// Read page
export function GetPost(slug: string) {
    return allPosts.find(post => post?.slug === slug)
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

// Category Page
export async function GetCategoryPost(slug: string) {
    const CategoryPosts: Post[] = []

    allPosts.map(post => {
        if (post.category) {
            post.category.filter(category => {
                if (
                    category.toLowerCase().trim().split(' ').join('-') === slug
                ) {
                    CategoryPosts.push(post)
                }
            })
        }
    })

    return CategoryPosts
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
export async function GetTagsPost(slug: string) {
    const TagPosts: Post[] = []

    allPosts.map(post => {
        if (post.tags) {
            post.tags.filter(tag => {
                if (tag.toLowerCase().trim().split(' ').join('-') === slug) {
                    TagPosts.push(post)
                }
            })
        }
    })

    return TagPosts
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
