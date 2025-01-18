import { notFound } from 'next/navigation'

import { FeaturedImage } from '@/components/atoms/FeaturedImage'
import { AsteriskFooter } from '@/components/molecules/AsteriskFooter'
import { Newsletter } from '@/components/organisms/Newsletter'
import { PostArchives } from '@/components/organisms/PostArchives'
import { PostHeader } from '@/components/organisms/PostHeader'
import { getAllPosts, getPost, getRelatedPosts } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { getImageUrl } from '@/lib/utils'

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

            <AsteriskFooter />

            <Newsletter />

            {relatedPosts.length !== 0 && (
                <PostArchives title="Related posts" posts={relatedPosts} />
            )}
        </>
    )
}

export default Page
