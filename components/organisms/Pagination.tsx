import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

import { buttonVariants } from '@/components/atoms/Button'
import { Label } from '@/components/atoms/Label'
import { classNames } from '@/lib/utils'

type PaginationLinkProps = {
    isActive?: boolean
    variant?: 'previous' | 'next'
    size?: 'default' | 'icon'
    'aria-disabled'?: boolean
} & React.ComponentProps<'a'>

const PaginationLink = ({
    isActive,
    variant,
    size = 'default',
    children,
    className,
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        aria-label={
            variant === 'previous'
                ? 'Go to previous page'
                : variant === 'next'
                  ? 'Go to next page'
                  : undefined
        }
        className={classNames(
            buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
            variant === 'previous' && 'gap-1 pl-2.5',
            variant === 'next' && 'gap-1 pr-2.5',
            className
        )}
        {...props}
    >
        {variant === 'previous' && <ChevronLeft className="h-4 w-4" />}
        {children}
        {variant === 'next' && <ChevronRight className="h-4 w-4" />}
    </a>
)

export const Pagination = () => {
    return (
        <div className="mx-auto my-8 grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
            <Label className="text-center text-sm">
                Showing 1 to 10 of 100 Entries
            </Label>
            <nav
                role="navigation"
                aria-label="pagination"
                className="mx-auto flex w-full justify-center"
            >
                <ul className="flex flex-row items-center gap-1">
                    <li>
                        <PaginationLink href="#" variant="previous">
                            Previous
                        </PaginationLink>
                    </li>
                    <li>
                        <PaginationLink href="#" variant="next">
                            Next
                        </PaginationLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
