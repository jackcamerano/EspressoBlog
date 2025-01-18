import React from 'react'

import { classNames } from '@/lib/utils'

const BlogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={classNames(
            'text-2xl font-semibold leading-none tracking-tight lg:text-4xl',
            className
        )}
        {...props}
    />
))
BlogTitle.displayName = 'BlogTitle'

export default BlogTitle
