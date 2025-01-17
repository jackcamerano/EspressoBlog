import { notFound } from 'next/navigation'
import React from 'react'

import { FeaturedImage } from '@/components/FeaturedImage'
import { AsteriskFooter } from '@/components/molecules/AsteriskFooter'
import { Newsletter } from '@/components/Newsletter'
import { PageHeader } from '@/components/organisms/PageHeader'
import { getAllPages, getPage } from '@/data'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { config } from '@/next.config'

export const generateStaticParams = async () => {
    return await getAllPages()
}

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params

    return { title: slug }
}
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
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
        </>
    )
}

export default Page
