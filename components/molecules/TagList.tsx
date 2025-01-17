// components/atoms/TagList.tsx
import { Tag } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/atoms/Button'
import { Tag as TagType } from '@/types'

export const TagList = ({
    title = '',
    tags
}: {
    title: string
    tags: TagType[]
}) => (
    <div>
        {title}
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <Button
                    key={tag.id}
                    variant="link"
                    className="!px-1 font-bold"
                    asChild
                >
                    <Link className="capitalize" href={`/tag/${tag.slug}`}>
                        <Tag className="mr-1" /> {tag.name}
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)
