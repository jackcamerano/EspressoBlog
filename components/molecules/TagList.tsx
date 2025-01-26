import { Tag } from 'lucide-react'
import Link from 'next/link'
import { memo, useCallback } from 'react'

import { Button } from '@/components/atoms/Button'
import { Tag as TagType } from '@/types/types'

interface TagListProps {
    title?: string
    tags?: TagType[]
}

export const TagList = memo(({ title = '', tags = [] }: TagListProps) => {
    const renderTag = useCallback(
        (tag: TagType) => (
            <Button
                key={tag.slug}
                variant="link"
                className="!px-1 font-bold"
                asChild
            >
                <Link className="capitalize" href={`/tag/${tag.slug}`}>
                    <Tag className="mr-1" /> {tag.name}
                </Link>
            </Button>
        ),
        []
    )

    if (!tags || tags.length === 0) {
        return null
    }

    return (
        <section aria-label="Post tags">
            {title}
            <div className="flex flex-wrap gap-2">{tags.map(renderTag)}</div>
        </section>
    )
})

TagList.displayName = 'TagList'
