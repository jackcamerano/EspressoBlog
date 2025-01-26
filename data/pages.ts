import { Page } from '@/types/types'

export const pages: Page[] = [
    {
        title: 'About',
        description: 'Brief description of the site',

        featuredImage: {
            name: 'image name',
            url: 'https://picsum.photos/1280/853',
            alternativeText:
                'Alt text for the image. This is a description of the image.'
        },
        author: {
            name: 'Jack'
        },
        slug: 'about',
        date: '2025-01-15',
        content:
            '## Investment build early group actually despite.\n\nManagement information voice alone. Million question different build. Agent one turn care believe capital however.\n\n1. herself\n2. fund\n\n**Answer agreement professor purpose it.**'
    },
    {
        title: 'Contact',
        description: 'Contact page description',
        featuredImage: {
            url: 'https://picsum.photos/1280/853',
            alternativeText:
                'Alt text for the image. This is a description of the image.'
        },
        author: {
            name: 'Jack'
        },
        slug: 'contact',
        date: '2025-01-12',
        content:
            '## Education eat ago society office talk.\n\nTeach eat official lead third. Task either difficult national. Single black sort officer outside. Form since too develop community state thing fast. Line require baby fine. Change local collection see.\n\n1. me\n2. popular\n\n**Up series senior field responsibility goal might.**'
    },
    {
        title: 'Support',
        description: 'Another random page description',
        featuredImage: {
            url: 'https://picsum.photos/1280/853'
        },
        author: {
            name: 'Jack'
        },
        slug: 'support',
        date: '2025-01-10',
        content:
            '## Wind foreign strong these station.\n\nJob receive me a. Fast low home house for hand. Style color new alone real debate attention brother. Answer leg research approach administration star. Few him today see under before.\n\n1. study\n2. top\n\n**Agent rest case capital page.**'
    }
]
