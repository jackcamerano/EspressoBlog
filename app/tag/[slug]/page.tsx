import { notFound } from 'next/navigation'

import { PostArchives } from '@/components/organisms/PostArchives'
import { client } from '@/lib/clients'

import type { Metadata } from 'next'

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> => {
    const { slug } = await params

    return { title: `Articles Related to ${slug?.trim().replaceAll(' ', '-')}` }
}

export const generateStaticParams = async () => {
    return client.getTags()
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
