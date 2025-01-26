import { notFound } from 'next/navigation'
import React from 'react'

import { FeaturedImage } from '@/components/atoms/FeaturedImage'
import { PageHeader } from '@/components/organisms/PageHeader'
import { client } from '@/lib/clients'
import { renderAndSanitizeMarkdown } from '@/lib/renderMarkdown'
import { getImageUrl } from '@/lib/utils'

export const generateStaticParams = async () => {
    try {
        const pages = await client.getAllPages()
        return pages.map(page => ({ slug: page.slug }))
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

    return { title: slug }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const page = await client.getPage(slug)

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
        </>
    )
}

export default Page
