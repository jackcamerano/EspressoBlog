import React from 'react'

import { Label } from '@/components/ui/label'
import {
    Pagination as PaginationBox,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

export const Pagination = () => {
    return (
        <div className="mx-auto my-8 grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
            <Label className="text-center text-sm">
                {' '}
                Showing 1 to 10 of 100 Entries{' '}
            </Label>

            <PaginationBox>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </PaginationBox>
        </div>
    )
}
