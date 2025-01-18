import dayjs from 'dayjs'
import React from 'react'

import { Post } from '@/types'

import { BlogHeader } from './BlogHeader'

const DATE_FORMAT = 'DD MMM, YYYY'

export const PostHeader = ({ item }: { item: Post }) => {
    const { title, description, categories, tags } = item
    const author = item.createdBy.firstname ?? ''

    const date = React.useMemo(() => {
        try {
            return dayjs(item.date).format(DATE_FORMAT)
        } catch (error) {
            console.error('Failed to parse date:', error)
            return 'Date unavailable'
        }
    }, [item.date])

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
