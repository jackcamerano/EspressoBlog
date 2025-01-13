import { notFound } from 'next/navigation'

import { AsteriskFooter } from '@/components/AsteriskFooter'
import { FeaturedImage } from '@/components/FeaturedImage'
import { Newsletter } from '@/components/Newsletter'
import { PostArchives } from '@/components/PostArchive'
import { ReadHeader } from '@/components/PostHeader'
import { getAllPosts, getPost, getRelatedPosts } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { config } from '@/next.config'

export const generateStaticParams = async () =>
    (await getAllPosts()).map(post => ({ slug: post.slug }))

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return { title: post.title }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const { featuredImage, content, title, tags } = post

    const renderedContent = renderAndSanitizeMarkdown(content)

    const relatedPosts = tags?.length
        ? await getRelatedPosts(tags[0].slug, slug)
        : []

    return (
        <>
            {post && <ReadHeader item={post} />}

            {featuredImage && (
                <FeaturedImage
                    url={new URL(
                        featuredImage.url,
                        config.STRAPI_API_URL
                    ).toString()}
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

            <AsteriskFooter />

            <Newsletter />

            {relatedPosts.length !== 0 && (
                <PostArchives title="Related posts" posts={relatedPosts} />
            )}
        </>
    )
}

export default Page
