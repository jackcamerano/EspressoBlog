import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/Card'
import { getCategories, getPostsByCategory } from '@/data'

import type { Post } from '@/types'
import type { Metadata } from 'next'

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params

    return {
        title: `Articles Categorised as ${slug?.trim().replaceAll(' ', '-')}`
    }
}

export async function generateStaticParams() {
    return await getCategories()
}

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const posts = await getPostsByCategory(slug)

    if (posts.length === 0) {
        notFound()
    }

    const title = slug.replaceAll('-', ' ')

    return (
        <>
            <div className="container mx-auto my-24 px-4">
                <h2 className="my-8 text-3xl font-bold capitalize">
                    Articles Categorised as {title}
                </h2>
            </div>

            <div className="container mx-auto mt-8">
                {posts.map((item: Post) => (
                    <BlogCard item={item} key={item.id} />
                ))}
            </div>
        </>
    )
}
