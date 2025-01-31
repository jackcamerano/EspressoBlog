import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
    content: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content
}) => {
    return (
        <ReactMarkdown
            components={{
                code({ className, children, ...props }) {
                    const isInline = !className
                    const match = /language-(\w+)/.exec(className || '')
                    return !isInline && match ? (
                        <SyntaxHighlighter
                            style={nightOwl}
                            language={match[1]}
                            showLineNumbers
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                pre({ children }) {
                    return <>{children}</>
                }
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
