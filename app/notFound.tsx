import React from 'react'

import { BackButton } from '@/components/BackButton'
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from '@/components/ui/card'

const Notfound = () => {
    return (
        <Card className="mt-16 border-none shadow-none">
            <CardContent className="mx-auto flex w-full flex-col items-center text-center">
                <CardTitle className="my-4 text-6xl font-bold md:text-7xl">
                    404 Error
                </CardTitle>
                <CardDescription className="mx-auto mb-5 text-lg md:mb-6 lg:mb-8">
                    Commodo, consequat turpis placerat ultrices sapien, tortor
                    tincidunt. Sit quisque est metus auctor sed turpis lectus
                    quis.
                </CardDescription>
                <BackButton />
            </CardContent>
        </Card>
    )
}

export default Notfound
