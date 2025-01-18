import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaGithub
} from 'react-icons/fa'

import type { IconType } from 'react-icons'

interface IconProps {
    size?: number
    color?: string
    title?: string
    icon: IconType
}

export const Icon = ({
    size = 24,
    color = 'currentColor',
    title,
    icon: IconComponent
}: IconProps) => (
    <IconComponent size={size} color={color} aria-label={title} role="img" />
)

export const Facebook = (props: Omit<IconProps, 'icon'>) => (
    <Icon icon={FaFacebook} title="Facebook" {...props} />
)
export const Instagram = (props: Omit<IconProps, 'icon'>) => (
    <Icon icon={FaInstagram} title="Instagram" {...props} />
)
export const Linkedin = (props: Omit<IconProps, 'icon'>) => (
    <Icon icon={FaLinkedin} title="LinkedIn" {...props} />
)
export const Twitter = (props: Omit<IconProps, 'icon'>) => (
    <Icon icon={FaTwitter} title="Twitter" {...props} />
)
export const Github = (props: Omit<IconProps, 'icon'>) => (
    <Icon icon={FaGithub} title="GitHub" {...props} />
)
