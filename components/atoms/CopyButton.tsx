'use client'

import { useState } from 'react'

interface CopyButtonProps {
    text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    )
}
