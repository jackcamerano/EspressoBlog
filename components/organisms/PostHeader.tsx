import dayjs from 'dayjs'

import { Post } from '@/types'

import { BlogHeader } from './BlogHeader'

export const PostHeader = ({ item }: { item: Post }) => {
    const date = dayjs(item.date).format('DD MMM, YYYY')
    return (
        <BlogHeader
            title={item.title}
            description={item.description}
            author={item.createdBy.firstname ?? ''}
            date={date}
            categories={item.categories}
            tags={item.tags}
        ></BlogHeader>
    )
}
