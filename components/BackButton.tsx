import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

export function BackButton() {
    return (
        <Button className="rounded-2xl" asChild>
            <Link href="/">
                <ChevronLeft /> Back
            </Link>
        </Button>
    )
}
