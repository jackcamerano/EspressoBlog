import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { config } from '@/next.config'

import BlogDescription from '../atoms/Blog/BlogDescription'
import BlogTitle from '../atoms/Blog/BlogTitle'
import { CategoryList } from '../molecules/CategoryList'
import { ReadMoreLink } from '../molecules/ReadMoreLink'
import { TagList } from '../molecules/TagList'

import type { Category, Image as ImageType, Tag } from '@/types'

export const PostContent = ({
    title,
    date,
    description,
    slug,
    image,
    categories = [],
    tags = []
}: {
    title: string
    date: string
    description: string
    slug: string
    image?: ImageType
    categories?: Category[]
    tags?: Tag[]
}) => (
    <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
        <div className="order-2 space-y-4 lg:order-1">
            <div className="mb-4 mt-4 flex items-center gap-3">
                <CategoryList categories={categories} />
                <span className="text-sm text-muted-foreground">{date}</span>
            </div>

            <BlogTitle className="text-xl font-bold">
                <Link href={`/read/${slug}`}>{title}</Link>
            </BlogTitle>

            <BlogDescription>{description}</BlogDescription>

            <ReadMoreLink href={`/read/${slug}`} />

            {tags.length > 0 && <TagList title="We talk about:" tags={tags} />}
        </div>

        <div className="relative order-1 aspect-[6/5] overflow-hidden rounded-lg md:aspect-[6/3] lg:order-2">
            {image && (
                <Link href={`/read/${slug}`}>
                    <Image
                        src={new URL(
                            image.url,
                            config.STRAPI_API_URL
                        ).toString()}
                        alt={image.alternativeText ?? title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </Link>
            )}
        </div>
    </div>
)
