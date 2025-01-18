import { Metadata } from 'next'

import { Hero } from '@/components/organisms/Hero'
import { PostArchives } from '@/components/organisms/PostArchives'
import { getAllPosts } from '@/data'

import { Pagination } from '../components/organisms/Pagination'

export const metadata: Metadata = {
    title: 'Home | Blogify',
    description:
        'Blogify is an open-source nextjs blog template design with tailwind CSS.'
}

const HERO_TITLE = 'Welcome to Blogify Theme'
const HERO_DESCRIPTION =
    'Blogify is a modern nextjs, typescript, and tailwind css based theme ' +
    'featuring captivating page transitions, a unique custom cursor, and a ' +
    'sleek scrollbar, all enhanced with smooth scrolling.'

const Page = async () => {
    const posts = await getAllPosts()
    return (
        <>
            <Hero title={HERO_TITLE} description={HERO_DESCRIPTION} />

            <main className="container mx-auto flex flex-col p-3">
                <PostArchives title="All posts" posts={posts} />

                <Pagination />
            </main>
        </>
    )
}

export default Page
