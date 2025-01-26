import React from 'react'

import { BlogHeader } from '@/components/organisms/BlogHeader'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/types'

type PostHeaderProps = {
    item: Post
}

export const PostHeader = ({ item }: PostHeaderProps) => {
    const { title, description, categories, tags } = item
    const author = item.author?.name ?? ''

    const date = React.useMemo(() => formatDate(item.date), [item.date])

    return (
        <BlogHeader
            title={title}
            description={description}
            author={author}
            date={date}
            categories={categories}
            tags={tags}
        />
    )
}
