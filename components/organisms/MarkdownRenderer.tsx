import hljs from 'highlight.js'
import markdownit from 'markdown-it'
import React from 'react'
import sanitizeHtml from 'sanitize-html'
import 'highlight.js/styles/night-owl.css'

const md = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const highlighted = hljs.highlight(str, {
                    language: lang
                }).value
                const lines = highlighted
                    .split('\n')
                    .map(
                        (line, index) =>
                            `<span class="hljs-line"><span class="line-number select-none mr-4">${index + 1}</span>${line || ' '}</span>`
                    )
                    .join('\n')
                return `<span class="lang-label block bg-gray-800 text-gray-400 text-xs font-medium uppercase mb-2 w-fit">${lang}</span>${lines}`
            } catch (__) {}
        }
        console.log(`couldn't build code block, unknown lang:'${lang}'`)
        return str
    }
})

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
