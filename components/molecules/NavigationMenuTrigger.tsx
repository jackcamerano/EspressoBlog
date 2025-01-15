import { Trigger } from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import React from 'react'

import { classNames } from '@/lib/utils'

const navigationMenuTriggerStyle = cva(
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
)

const NavigationMenuTrigger = React.forwardRef<
    React.ElementRef<typeof Trigger>,
    React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
    <Trigger
        ref={ref}
        className={classNames(navigationMenuTriggerStyle(), 'group', className)}
        {...props}
    >
        {children}
        <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </Trigger>
))

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'
export default NavigationMenuTrigger
