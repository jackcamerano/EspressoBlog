export interface Category {
    id: number
    name: string
    slug: string
}

export interface Tag {
    id: number
    name: string
    slug: string
}

export interface Image {
    id: number
    name: string
    url: string
    alternativeText: string | null
}

export interface Author {
    firstname: string | null
    lastname: string | null
    username: string | null
}

export interface Post {
    id: string
    title: string
    description: string
    tags: Tag[]
    categories: Category[]
    featuredImage: Image
    createdBy: Author
    slug: string
    publishedAt: string
    content: string
}

export interface Page {
    id: string
    title: string
    description: string
    featuredImage: Image
    createdBy: Author
    slug: string
    publishedAt: string
    content: string
}
