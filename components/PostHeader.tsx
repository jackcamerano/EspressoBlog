import React from 'react'
import Link from 'next/link'
import {
    Card,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { Post } from '@/types'
import { ChevronLeft, Tag } from 'lucide-react'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'

export function ReadHeader({ item }: { item: Post }) {
    const getDate = dayjs(item.date).format('DD MMM, YYYY')
    return (
        <Card className="mx-auto mt-12 flex max-w-6xl flex-col border-none shadow-none">
            <CardContent>
                <div className="mb-3 flex flex-row items-center text-center">
                    <Button className="rounded-2xl" asChild>
                        <Link href="/">
                            <ChevronLeft /> Back
                        </Link>
                    </Button>
                    <Label className="mx-2 text-left font-bold">
                        Published by {item.author}
                    </Label>
                    <Label className="mr-2 text-left font-bold">
                        on {getDate}
                    </Label>
                </div>
                {item.category && item.category.length > 0 && (
                    <>
                        Categories:
                        {item.category.map((category, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="!px-1 font-bold"
                                asChild
                            >
                                <Link
                                    className="capitalize"
                                    href={`/category/${category.trim().toLowerCase().replaceAll(' ', '-')}`}
                                >
                                    <Tag /> {category}
                                </Link>
                            </Button>
                        ))}
                    </>
                )}
                {item.tags && item.tags.length > 0 && (
                    <>
                        Tags:
                        {item.tags.map((tag, index) => (
                            <Button
                                key={index}
                                variant="link"
                                className="!px-1 font-bold"
                                asChild
                            >
                                <Link
                                    className="capitalize"
                                    href={`/tag/${tag.trim().toLowerCase().replaceAll(' ', '-')}`}
                                >
                                    <Tag /> {tag}
                                </Link>
                            </Button>
                        ))}
                    </>
                )}

                <CardTitle className="text-3xl font-extrabold lg:text-6xl">
                    {item.title}
                </CardTitle>

                <CardDescription className="mt-4 text-xl font-semibold">
                    {item.description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
