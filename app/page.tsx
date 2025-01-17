import { Metadata } from 'next'

import { Hero } from '@/components/organisms/Hero'
import { Newsletter } from '@/components/organisms/Newsletter'
import { PostArchives } from '@/components/organisms/PostArchives'
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
            <Hero
                title="Welcome to Blogify Theme"
                description="Blogify is a modern nextjs, typescript, and tailwind css based theme featuring captivating page transitions, a unique custom cursor, and a sleek scrollbar, all enhanced with smooth scrolling."
            />
            <main className="container mx-auto flex flex-col p-3">
                <PostArchives title="All posts" posts={posts} />

                <Pagination />
            </main>

            <Newsletter />
        </>
    )
}

export default Page
