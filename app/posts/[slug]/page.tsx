import { notFound } from 'next/navigation'

import { FeaturedImage } from '@/components/atoms/FeaturedImage'
import { PostArchives } from '@/components/organisms/PostArchives'
import { PostHeader } from '@/components/organisms/PostHeader'
import { client } from '@/lib/clients'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { getImageUrl } from '@/lib/utils'

export const generateStaticParams = async () =>
    (await client.getAllPosts()).map(post => ({ slug: post.slug }))

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

    const renderedContent = renderAndSanitizeMarkdown(content)

    const relatedPosts = tags?.length
        ? await client.getRelatedPosts(tags, slug)
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
                {renderedContent && (
                    <div
                        dangerouslySetInnerHTML={{ __html: renderedContent }}
                    />
                )}
            </article>

            {relatedPosts.length !== 0 && (
                <PostArchives title="Related posts" posts={relatedPosts} />
            )}
        </>
    )
}

export default Page
