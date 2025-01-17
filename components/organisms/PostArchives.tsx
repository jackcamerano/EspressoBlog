import dayjs from 'dayjs'

import { PostContent } from '@/components/organisms/PostContent'

import type { Post } from '@/types'

export const PostArchives = ({
    title = 'Posts',
    posts
}: {
    title?: string
    posts: Post[]
}) => {
    return (
        <>
            <div className="container mx-auto my-24 px-4">
                <h2 className="my-8 text-3xl font-bold capitalize">{title}</h2>
            </div>

            <div className="container mx-auto mt-8 grid grid-cols-1 gap-8">
                {posts.map(item => {
                    const getDate = dayjs(item.date).format('DD MMM, YYYY')
                    return (
                        <article
                            key={item.id}
                            className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow"
                        >
                            <PostContent
                                title={item.title}
                                date={getDate}
                                description={item.description}
                                slug={item.slug}
                                image={item.featuredImage}
                                categories={item.categories}
                                tags={item.tags}
                            />
                        </article>
                    )
                })}
            </div>
        </>
    )
}
