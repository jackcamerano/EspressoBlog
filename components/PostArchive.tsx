import { Post } from '@/types'

import { BlogCard } from './Card'

type Props = {
    title: string
    posts: Post[]
}

export const PostArchives = ({ title, posts }: Props) => {
    return (
        <>
            <div className="container mx-auto my-24 px-4">
                <h2 className="my-8 text-3xl font-bold capitalize">{title}</h2>
            </div>

            <div className="container mx-auto mt-8">
                {posts.map((item: Post) => (
                    <BlogCard item={item} key={item.id} />
                ))}
            </div>
        </>
    )
}
