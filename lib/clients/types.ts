import type {
    Category,
    MenuItem,
    Page,
    Post,
    SocialLink,
    Tag
} from '@/types/types'

export interface CMSClient {
    getAllPosts(): Promise<Post[]>
    getPost(slug: string): Promise<Post | null>
    getCategory(slug: string): Promise<Category | null>
    getPostsByCategory(slug: string): Promise<Post[]>
    getCategories(): Promise<Category[]>
    getPostsByTag(slug: string): Promise<Post[]>
    getTags(): Promise<Tag[]>
    getRelatedPosts(tags: Tag[], excludedSlug: string): Promise<Post[]>
    getAllPages(): Promise<Page[]>
    getPage(slug: string): Promise<Page | null>
    getMenu(): Promise<MenuItem[]>
    getSocialLinks(): Promise<SocialLink[]>
}
