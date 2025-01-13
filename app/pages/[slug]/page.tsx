import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import { AsteriskFooter } from '@/components/AsteriskFooter'
import { Newsletter } from '@/components/Newsletter'
import { PageHeader } from '@/components/PageHeader'
import { getAllPages, getPage } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { config } from '@/next.config'

export const generateStaticParams = async () => {
    return await getAllPages()
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return { title: slug }
}
export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const page = await getPage(slug)

    if (!page) {
        notFound()
    }

    const { featuredImage, content, title } = page

    const renderedContent = renderAndSanitizeMarkdown(content)

    return (
        <>
            <PageHeader item={page} />

            {featuredImage && (
                <div className="relative my-10 aspect-[4/3] overflow-hidden">
                    <Image
                        src={new URL(
                            featuredImage.url,
                            config.STRAPI_API_URL
                        ).toString()}
                        alt={featuredImage.alternativeText ?? title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
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
        </>
    )
}
