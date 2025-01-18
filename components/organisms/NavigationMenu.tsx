import { Root, List, Item, Viewport } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import React from 'react'

import { classNames } from '@/lib/utils'

const navigationMenuLinkClasses = classNames(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'text-primary underline-offset-4 hover:underline h-9 px-4 py-2'
)

const NavigationMenuViewport = () => (
    <div className="absolute left-0 top-full flex justify-center">
        <Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
    </div>
)

type MenuItem = {
    href: string
    label: string
}

const NavigationMenuItems = ({ items }: { items: MenuItem[] }) => (
    <>
        {items.map(({ href, label }) => (
            <Item key={href}>
                <Link href={href} className={navigationMenuLinkClasses}>
                    {label}
                </Link>
            </Item>
        ))}
    </>
)

const NavigationMenu = React.forwardRef<
    React.ElementRef<typeof Root>,
    React.ComponentPropsWithoutRef<typeof Root> & { menuItems: Array<MenuItem> }
>(({ className, menuItems, ...props }, ref) => (
    <Root
        ref={ref}
        className={classNames(
            'relative z-10 flex max-w-max items-center justify-center',
            className
        )}
        aria-label="Main navigation"
        {...props}
    >
        <List className="group flex flex-1 list-none items-center justify-center space-x-4">
            <NavigationMenuItems items={menuItems} />
        </List>
        <NavigationMenuViewport />
    </Root>
))

NavigationMenu.displayName = 'NavigationMenu'

export default NavigationMenu
