import React from 'react'

import { formatDate } from '@/lib/utils'
import { Post } from '@/types'

import { BlogHeader } from './BlogHeader'

export const PostHeader = ({ item }: { item: Post }) => {
    const { title, description, categories, tags } = item
    const author = item.createdBy.firstname ?? ''

    const date = React.useMemo(
        () => formatDate(item.publishedAt),
        [item.publishedAt]
    )

    return (
        <BlogHeader
            title={title}
            description={description}
            author={author}
            date={date}
            categories={categories}
            tags={tags}
        ></BlogHeader>
    )
}
