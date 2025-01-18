import Link from 'next/link'
import { memo } from 'react'

import { Badge } from '@/components/atoms/Badge'
import { Category } from '@/types'

interface CategoryListProps {
    categories: Category[]
}

export const CategoryList = memo(({ categories }: CategoryListProps) => {
    if (!categories?.length) {
        return null
    }

    return (
        <div className="flex items-center gap-3">
            {categories.map(cat => (
                <Badge key={cat.id} className="rounded">
                    <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
                </Badge>
            ))}
        </div>
    )
})

CategoryList.displayName = 'CategoryList'
