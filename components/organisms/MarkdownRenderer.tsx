import markdownit from 'markdown-it'
import React from 'react'
import sanitizeHtml from 'sanitize-html'

const md = new markdownit()

interface MarkdownRendererProps {
    content: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content
}) => {
    const unsafeHtml = md.render(content)

    const cleanHtml = sanitizeHtml(unsafeHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img',
            'h1',
            'h2',
            'pre',
            'code',
            'span'
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt'],
            span: ['class'],
            code: ['class']
        }
    })

    return (
        <div
            className="markdown-container prose mx-auto max-w-6xl px-6 dark:prose-invert lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
    )
}
