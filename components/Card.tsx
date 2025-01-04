import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import dayjs from 'dayjs'
import { Post } from '@/types'
import Link from '@/node_modules/next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function BlogCard({ item }: { item: Post }) {
    const GetDate = dayjs(item.date).format('DD MMM, YYYY')
    const slug = item.title?.toLowerCase().replaceAll(' ', '-')

    const categories = item.category?.map(item => {
        return {
            name: item,
            slug: item.toLowerCase().replaceAll(' ', '-')
        }
    })

    return (
        <Card className="mx-auto my-8 w-full max-w-7xl overflow-hidden border-border">
            <CardContent className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
                <div className="order-2 space-y-4 lg:order-1">
                    <div className="mb-4 mt-4 flex items-center gap-3">
                        {categories.map((cat, index) => (
                            <Badge key={index} className="rounded">
                                <Link href={`/category/${cat.slug}`}>
                                    {cat.name}
                                </Link>
                            </Badge>
                        ))}
                        <span className="text-sm text-muted-foreground">
                            {GetDate}
                        </span>
                    </div>
                    <CardTitle className="text-2xl font-bold leading-tight lg:text-3xl">
                        <Link href={`/read/${slug}`}>{item.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-md font-medium text-card-foreground/90 lg:text-xl">
                        {item.description}
                    </CardDescription>
                    <Button
                        variant="link"
                        className="text-md !mx-0 mt-3 !px-0"
                        asChild
                    >
                        <Link href={`/read/${slug}`}>
                            <ChevronRight /> Read More{' '}
                        </Link>
                    </Button>
                </div>

                <div className="relative order-1 aspect-[6/5] overflow-hidden rounded-lg md:aspect-[6/3] lg:order-2">
                    <Link href={`/read/${slug}`}>
                        <Image
                            src={item.image}
                            alt={item.title}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
