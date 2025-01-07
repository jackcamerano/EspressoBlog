import Image from 'next/image'
import { notFound } from 'next/navigation'

import { AsteriskFooter } from '@/components/AsteriskFooter'
import { Newsletter } from '@/components/Newsletter'
import { PostArchives } from '@/components/PostArchive'
import { ReadHeader } from '@/components/PostHeader'
import { getAllPosts, getPost, getRelatedPosts } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { config } from '@/next.config'

export const generateStaticParams = async () =>
    (await getAllPosts()).map(post => ({ slug: post.slug }))

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return { title: post.title }
}

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    const content = renderAndSanitizeMarkdown(post.content)

    const relatedPosts = post.tags?.length
        ? await getRelatedPosts(post.tags[0].slug, slug)
        : []

    return (
        <>
            {post && <ReadHeader item={post} />}

            {post?.featuredImage && (
                <div className="relative my-10 aspect-[4/3] overflow-hidden">
                    <Image
                        src={new URL(
                            post.featuredImage.url,
                            config.STRAPI_API_URL
                        ).toString()}
                        alt={post.featuredImage.alternativeText ?? post.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            )}

            <article className="container prose mx-auto max-w-6xl px-6 dark:prose-invert lg:prose-xl">
                {content && (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
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
