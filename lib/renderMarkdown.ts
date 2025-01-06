import markdownit from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const md = new markdownit()

export const renderAndSanitizeMarkdown = (rawMarkdown: string): string => {
    const unsafeHtml = md.render(rawMarkdown)

    const cleanHtml = sanitizeHtml(unsafeHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img',
            'h1',
            'h2'
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt']
        }
    })

    return cleanHtml
}
