import BlogDescription from '@/components/atoms/Blog/BlogDescription'
import BlogTitle from '@/components/atoms/Blog/BlogTitle'
import { BackButton } from '@/components/molecules/BackButton'
import { CategoryList } from '@/components/molecules/CategoryList'
import { TagList } from '@/components/molecules/TagList'

import type { Category, Tag } from '@/types'

interface BlogHeaderProps {
    title: string
    description?: string
    author?: string
    date?: string
    categories?: Category[]
    tags?: Tag[]
}

export const BlogHeader = ({
    title,
    description = '',
    author = '',
    date = '',
    categories = [],
    tags = []
}: BlogHeaderProps) => {
    return (
        <header className="mx-auto mt-12 flex max-w-6xl flex-col border-none shadow-none">
            <div className="mb-3 flex items-center">
                <BackButton />
                {author && (
                    <span className="mx-2 font-bold">
                        Published by {author}
                    </span>
                )}
                {date && <span className="mr-2 font-bold">on {date}</span>}

                <CategoryList categories={categories} />
            </div>

            <BlogTitle className="text-3xl font-extrabold lg:text-6xl">
                {title}
            </BlogTitle>
            <BlogDescription className="mt-4 text-xl font-semibold">
                {description}
            </BlogDescription>

            <div className="mt-4 flex items-center">
                <TagList title="We talk about:" tags={tags} />
            </div>
        </header>
    )
}
