import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../atoms/Button'

type ReadMoreLinkProps = {
    href?: string
}

export const ReadMoreLink = ({ href = '/' }: ReadMoreLinkProps) => (
    <Button variant="link" className="text-md !mx-0 mt-3 !px-0" asChild>
        <Link href={href}>
            <ChevronRight /> Read More{' '}
        </Link>
    </Button>
)
