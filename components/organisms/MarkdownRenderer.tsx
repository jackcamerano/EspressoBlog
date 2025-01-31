import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { CopyButton } from '../atoms/CopyButton'
import { LanguageLabel } from '../atoms/LanguageLabel'

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
                    const language =
                        className?.replace(/^language-/, '') || 'plaintext'
                    const codeString = String(children).trim().concat('\n')

                    return !isInline ? (
                        <div className="group relative">
                            <LanguageLabel language={language} />
                            <CopyButton text={codeString} />
                            <SyntaxHighlighter
                                style={nightOwl}
                                language={language}
                                showLineNumbers
                            >
                                {codeString}
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
