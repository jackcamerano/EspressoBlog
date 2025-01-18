'use client'

import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/atoms/Button'
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Logo
} from '@/components/icons'
import NavigationMenu from '@/components/organisms/NavigationMenu'
import { ThemeToggle } from '@/components/organisms/ThemeToggle'

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
                    <Link href={'#'} aria-label="Visit our Facebook page">
                        <Facebook />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'#'} aria-label="Visit our Instagram profile">
                        <Instagram />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'#'} aria-label="Visit our Twitter page">
                        <Twitter />
                    </Link>
                </Button>

                <Button variant="link" asChild>
                    <Link href={'#'} aria-label="Visit our LInkedin page">
                        <Linkedin />
                    </Link>
                </Button>

                <Button className="rounded-2xl">Subscribe</Button>
                <ThemeToggle />
            </div>
        </header>
    )
}
