import { notFound } from 'next/navigation'

import { BlogCard } from '@/components/Card'
import { GetCategories, GetPostsByCategory } from '@/data'

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
    return await GetCategories()
}

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    const posts = await GetPostsByCategory(slug)
    if (posts.length === 0) {
        notFound()
    }
    return (
        <>
            <div className="container mx-auto my-24 px-4">
                <h2 className="my-8 text-3xl font-bold capitalize">
                    Articles Categorised as {slug.replaceAll('-', ' ')}
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
