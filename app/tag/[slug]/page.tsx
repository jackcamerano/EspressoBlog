import { notFound } from 'next/navigation'

import { PostArchives } from '@/components/organisms/PostArchives'
import { client } from '@/lib/clients'

import type { Metadata } from 'next'

export const generateStaticParams = async () => {
    try {
        const tags = await client.getTags()
        return tags.map(tag => ({ slug: tag.slug }))
    } catch (error) {
        console.error('Failed to generate static params:', error)
        return []
    }
}

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> => {
    const { slug } = await params

    return { title: `Articles Related to ${slug?.trim().replaceAll(' ', '-')}` }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const posts = await client.getPostsByTag(slug)

    if (posts.length === 0) {
        notFound()
    }

    const title = slug.replaceAll('-', ' ')

    return <PostArchives title={`Articles Related to ${title}`} posts={posts} />
}

export default Page
