import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import NavigationMenu from '@/components/molecules/Navigation/NavigationMenu'
import { ThemeToggle } from '@/components/organisms/ThemeToggle'
import { client } from '@/lib/clients'
import { SocialLink } from '@/types/types'

import { SocialIcon } from '../molecules/SocialIcon'

export const Header = async () => {
    const menuItems = await client.getMenu()
    const socialLinks = await client.getSocialLinks()

    return (
        <header className="container mx-auto grid grid-cols-1 grid-rows-1 flex-wrap items-center justify-around gap-4 py-3 md:justify-between xl:grid-cols-6">
            <Button variant="link" className="stroke [&_svg]:size-8" asChild>
                <Link href="/" className="flex items-center">
                    <Logo />
                    <span className="self-center whitespace-nowrap text-2xl font-semibold">
                        Blogify
                    </span>
                </Link>
            </Button>

            <NavigationMenu
                className="mx-auto w-full xl:col-span-3"
                menuItems={menuItems}
            />

            <div className="mx-auto flex flex-row flex-wrap gap-4 xl:col-span-2 xl:col-start-5 xl:gap-2">
                {socialLinks.map((link: SocialLink) => {
                    return (
                        <SocialIcon
                            key={link.name}
                            socialName={link.name}
                            socialLink={link}
                        />
                    )
                })}

                <Button className="rounded-2xl">Subscribe</Button>
                <ThemeToggle />
            </div>
        </header>
    )
}
