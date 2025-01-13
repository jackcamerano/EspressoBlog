import { Metadata } from 'next'

import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { PostArchives } from '@/components/PostArchive'
import { getAllPosts } from '@/data'

import { Pagination } from '../components/Pagination'

export const metadata: Metadata = {
    title: 'Home | Blogify',
    description:
        'Blogify is an open-source nextjs blog template design with tailwind CSS.'
}

const Page = async () => {
    const posts = await getAllPosts()
    return (
        <>
            <Hero />
            <main className="container mx-auto flex flex-col p-3">
                <PostArchives title="All posts" posts={posts} />

                <Pagination />
            </main>

            <Newsletter />
        </>
    )
}

export default Page
