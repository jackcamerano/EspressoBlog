import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../atoms/Button'

type BackButtonProps = {
    href?: string
}

export const BackButton = ({ href = '/' }: BackButtonProps) => {
    return (
        <Button
            className="rounded-2xl"
            asChild
            aria-label="Go back"
            role="navigation"
        >
            <Link href={href}>
                <ChevronLeft /> Back
            </Link>
        </Button>
    )
}
