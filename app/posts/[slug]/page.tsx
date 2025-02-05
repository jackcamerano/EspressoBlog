import { notFound } from 'next/navigation'

import { FeaturedImage } from '@/components/atoms/FeaturedImage'
import { MarkdownRenderer } from '@/components/organisms/MarkdownRenderer'
import { PostArchives } from '@/components/organisms/PostArchives'
import { PostHeader } from '@/components/organisms/PostHeader'
import { client } from '@/lib/clients'
import { getImageUrl } from '@/lib/serverUtils'

export const generateStaticParams = async () => {
    try {
        const posts = await client.getAllPosts()
        return posts.map(post => ({ slug: post.slug }))
    } catch (error) {
        console.error('Failed to generate static params:', error)
        return []
    }
}

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params

    const post = await client.getPost(slug)

    if (!post) {
        notFound()
    }

    return { title: post.title }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const post = await client.getPost(slug)

    if (!post) {
        notFound()
    }

    const { featuredImage, content, title, tags } = post

    const MAX_RELATED_POSTS = 3

    const relatedPosts = tags?.length
        ? await client.getRelatedPosts(tags, slug, MAX_RELATED_POSTS)
        : []

    return (
        <>
            {post && <PostHeader item={post} />}

            {featuredImage && (
                <FeaturedImage
                    url={getImageUrl(featuredImage.url)}
                    alt={featuredImage.alternativeText ?? title}
                />
            )}

            <article className="container prose mx-auto max-w-6xl px-6 dark:prose-invert lg:prose-xl">
                <MarkdownRenderer content={content} />
            </article>

            {relatedPosts.length !== 0 && (
                <PostArchives title="Related posts" posts={relatedPosts} />
            )}
        </>
    )
}

export default Page
