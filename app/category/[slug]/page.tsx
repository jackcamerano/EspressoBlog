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

    return {
        title: `Articles Categorised as ${slug?.trim().replaceAll(' ', '-')}`
    }
}

export const generateStaticParams = async () => {
    return await client.getCategories()
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const posts = await client.getPostsByCategory(slug)

    if (posts.length === 0) {
        notFound()
    }

    const title = slug.replaceAll('-', ' ')

    return (
        <PostArchives
            title={`Articles Categorised as ${title}`}
            posts={posts}
        />
    )
}

export default Page
