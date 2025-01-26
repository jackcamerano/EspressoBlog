import { Page } from '@/types/types'

import { BlogHeader } from './BlogHeader'

export const PageHeader = ({ item }: { item: Page }) => {
    return <BlogHeader title={item.title} description={item.description} />
}
