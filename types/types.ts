interface Taxonomy {
    name: string
    slug: string
}

export type Category = Taxonomy

export type Tag = Taxonomy

export interface Image {
    url: string
    name?: string
    alternativeText?: string
}

export interface Author {
    name: string
    image?: Image
}

interface Content {
    title: string
    slug: string
    date: string
    content: string
    description?: string
    featuredImage?: Image
    author?: Author
}

export interface Post extends Content {
    tags: Tag[]
    categories: Category[]
}

export type Page = Content

export type MenuLink = {
    label: string
    href: string
    icon?: string
}
