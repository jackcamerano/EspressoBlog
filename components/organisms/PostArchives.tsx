import React from 'react'

import { PostArticle } from '@/components/organisms/PostArticle'

import type { Post } from '@/types/types'

interface PostArchivesProps {
    title?: string
    posts: Post[]
}

export const PostArchives = ({ title = 'Posts', posts }: PostArchivesProps) => {
    return (
        <div className="container mx-auto px-4">
            <div className="my-24">
                <h2 className="my-8 text-3xl font-bold capitalize">{title}</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8">
                {posts.map(item => (
                    <PostArticle key={item.slug} post={item} />
                ))}
            </div>
        </div>
    )
}
