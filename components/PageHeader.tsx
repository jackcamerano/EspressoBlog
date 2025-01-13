import React from 'react'

import { Card, CardTitle, CardContent } from '@/components/ui/card'

import { BackButton } from './BackButton'

import type { Page } from '@/types'

export function PageHeader({ item }: { item: Page }) {
    return (
        <Card className="mx-auto mt-12 flex max-w-6xl flex-col border-none bg-none shadow-none">
            <CardContent>
                <BackButton />

                <CardTitle className="text-3xl font-extrabold capitalize lg:text-6xl">
                    {item.title}
                </CardTitle>
            </CardContent>
        </Card>
    )
}
