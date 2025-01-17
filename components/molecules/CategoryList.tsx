import Link from 'next/link'

import { Badge } from '@/components/atoms/Badge'
import { Category } from '@/types'

export const CategoryList = ({ categories }: { categories: Category[] }) => (
    <div className="flex items-center gap-3">
        {categories.map(cat => (
            <Badge key={cat.id} className="rounded">
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
            </Badge>
        ))}
    </div>
)
