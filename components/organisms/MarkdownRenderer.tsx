import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CopyButton } from '../atoms/CopyButton'

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
                    const codeString = String(children).trim()

                    return !isInline && match ? (
                        <div className="group relative">
                            <CopyButton text={codeString} />{' '}
                            <SyntaxHighlighter
                                style={nightOwl}
                                language={match[1]}
                                showLineNumbers
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        </div>
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
