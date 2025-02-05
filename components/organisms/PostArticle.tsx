import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getImageUrl } from '@/lib/serverUtils'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/types'

import BlogDescription from '../atoms/Blog/BlogDescription'
import BlogTitle from '../atoms/Blog/BlogTitle'
import { CategoryList } from '../molecules/CategoryList'
import { ReadMoreLink } from '../molecules/ReadMoreLink'
import { TagList } from '../molecules/TagList'

interface PostArticleProps {
    post: Post
}

export const PostArticle = ({ post }: PostArticleProps) => {
    const {
        title,
        description,
        categories,
        tags,
        featuredImage: image,
        slug
    } = post

    const date = React.useMemo(() => formatDate(post.date), [post.date])

    const link = `/posts/${slug}`

    return (
        <article className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow">
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
                <div className="order-2 space-y-4 lg:order-1">
                    <div className="mb-4 mt-4 flex items-center gap-3">
                        <CategoryList categories={categories} />
                        <span className="text-sm text-muted-foreground">
                            {date}
                        </span>
                    </div>

                    <BlogTitle className="text-xl font-bold">
                        <Link
                            href={link}
                            aria-label={`View full article: ${title}`}
                        >
                            {title}
                        </Link>
                    </BlogTitle>

                    <BlogDescription>{description}</BlogDescription>

                    <ReadMoreLink href={link} />

                    <TagList title="We talk about:" tags={tags} />
                </div>

                <div className="relative order-1 aspect-[6/5] overflow-hidden rounded-lg md:aspect-[6/3] lg:order-2">
                    {image && (
                        <Link
                            href={link}
                            aria-label={`View full article: ${title}`}
                        >
                            <Image
                                src={getImageUrl(image.url)}
                                alt={image.alternativeText ?? title}
                                className="object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </article>
    )
}
