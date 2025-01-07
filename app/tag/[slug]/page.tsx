import { notFound } from 'next/navigation'

import { PostArchives } from '@/components/PostArchive'
import { getPostsByTag, GetTags } from '@/data'

import type { Metadata } from 'next'

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params

    return { title: `Articles Related to ${slug?.trim().replaceAll(' ', '-')}` }
}

export async function generateStaticParams() {
    return GetTags()
}

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const posts = await getPostsByTag(slug)

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
