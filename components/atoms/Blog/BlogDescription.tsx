import React from 'react'

import { classNames } from '@/lib/utils'

const BlogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={classNames(
            'text-sm leading-relaxed text-muted-foreground lg:text-lg',
            className
        )}
        {...props}
    />
))
BlogDescription.displayName = 'BlogDescription'

export default BlogDescription
