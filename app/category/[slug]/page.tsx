import { notFound } from 'next/navigation'

import { PostArchives } from '@/components/PostArchive'
import { getCategories, getPostsByCategory } from '@/data'

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
    return await getCategories()
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const posts = await getPostsByCategory(slug)

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
