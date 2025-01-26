export interface StrapiImage {
    id: number
    name: string
    url: string
    alternativeText: string | null
}

export interface StrapiAuthor {
    name: string
    slug?: string
    image: StrapiImage | null
}

export interface StrapiContent {
    id: string
    title: string
    description?: string
    featuredImage?: StrapiImage
    createdBy: StrapiAuthor
    slug: string
    publishedAt: string
    content: string
}

export type StrapiPage = StrapiContent

export interface StrapiTag {
    id: number
    name: string
    slug: string
}

export interface StrapiCategory {
    id: number
    name: string
    slug: string
}

export interface StrapiPost extends StrapiContent {
    tags: StrapiTag[]
    categories: StrapiCategory[]
}

export interface StrapiMenu {
    menu_item: StrapiMenuItem[]
}

export interface StrapiMenuItem {
    title: string
    link: string
}

export interface StrapiSocialLinks {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
    github: string
}
