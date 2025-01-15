'use client'

import Link from 'next/link'
import * as React from 'react'

import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Logo
} from '@/components/icons'
import NavigationMenu from '@/components/organisms/NavigationMenu'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'

export const Header = () => {
    const menuItems = [
        { href: '/', label: 'Home' },
        { href: '/tag/programming', label: 'Programming' },
        { href: '/tag/photography', label: 'Photography' },
        { href: '/tag/smart-phone', label: 'Smart Phone' },
        { href: '/pages/about', label: 'About' }
    ]

    return (
        <header className="container mx-auto grid grid-cols-1 grid-rows-1 flex-wrap items-center justify-around gap-4 py-3 md:justify-between xl:grid-cols-6">
            <Button variant="link" className="stroke [&_svg]:size-8" asChild>
                <Link href="/" className="flex items-center">
                    <>
                        <Logo />{' '}
                        <span className="self-center whitespace-nowrap text-2xl font-semibold">
                            Blogify
                        </span>
                    </>
                </Link>
            </Button>

            <NavigationMenu
                className="mx-auto w-full xl:col-span-3"
                menuItems={menuItems}
            />

            <div className="mx-auto flex flex-row flex-wrap gap-4 xl:col-span-2 xl:col-start-5 xl:gap-2">
                <Button variant="link" asChild>
                    <Link href={'#'}>
                        <Facebook />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'#'}>
                        <Instagram />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'https://x.com/FrontendWeb3'}>
                        <Twitter />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'https://www.linkedin.com/company/frontendweb'}>
                        <Linkedin />
                    </Link>
                </Button>

                <Button className="rounded-2xl"> Subscrible </Button>
                <ThemeToggle />
            </div>
        </header>
    )
}
