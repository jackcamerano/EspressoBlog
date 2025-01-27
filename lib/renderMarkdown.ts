import hljs from 'highlight.js'
import markdownit from 'markdown-it'
import 'highlight.js/styles/night-owl.css'
import sanitizeHtml from 'sanitize-html'

const md = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value
            } catch (__) {}
        }

        return ''
    }
})

export const renderAndSanitizeMarkdown = (rawMarkdown: string): string => {
    const unsafeHtml = md.render(rawMarkdown)

    const cleanHtml = sanitizeHtml(unsafeHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img',
            'h1',
            'h2',
            '<pre>',
            '<code>',
            '<span>'
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt'],
            span: ['class'],
            code: ['class']
        }
    })

    return cleanHtml //*/
}
