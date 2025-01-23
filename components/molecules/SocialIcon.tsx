import Link from 'next/link'

import { Button } from '@/components/atoms/Button' // Adjust the import path as needed
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Github
} from '@/components/atoms/Icons'
import { SocialLink, Socials } from '@/types/types'

export const socialIcons: Record<Socials, React.FC> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github
}

interface SocialIconProps {
    socialName: Socials
    socialLink: SocialLink
}

export const SocialIcon: React.FC<SocialIconProps> = ({
    socialName,
    socialLink
}) => {
    const Icon = socialIcons[socialName]

    return (
        <Button variant="link" asChild>
            <Link
                href={socialLink.url}
                aria-label={`Visit our ${socialName} page`}
            >
                <Icon />
            </Link>
        </Button>
    )
}
