import { Asterisk } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/Card'
import { Newsletter } from '@/components/Newsletter'
import { ReadHeader } from '@/components/PostHeader'
import { getAllPosts, getPost } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { config } from '@/next.config'
import { Post } from '@/types'

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

    const getRelatedPosts: Post[] = [] //RelatedPosts(post.tags[0], slug)

    return (
        <>
            {post && <ReadHeader item={post} />}

            {post?.featuredImage && (
                <div className="relative my-10 aspect-[4/3] overflow-hidden">
                    <Image
                        src={config.STRAPI_API_URL + post.featuredImage.url}
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

            <div className="my-10 flex w-full items-center rounded-full">
                <div className="border-fd-border flex-1 border-b"></div>
                <span className="flex flex-row px-8 py-3 text-lg font-semibold leading-8">
                    {' '}
                    <Asterisk /> <Asterisk /> <Asterisk />{' '}
                </span>
                <div className="border-fd-border flex-1 border-b"></div>
            </div>

            <Newsletter />

            {getRelatedPosts.length !== 0 && (
                <div className="container mx-auto mt-28">
                    <h1 className="text-3xl font-extrabold lg:text-6xl">
                        {' '}
                        Related Posts{' '}
                    </h1>
                    {getRelatedPosts?.map(item => {
                        return <BlogCard key={item.id} item={item} />
                    })}
                </div>
            )}
        </>
    )
}
