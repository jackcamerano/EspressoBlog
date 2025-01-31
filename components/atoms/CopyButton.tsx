'use client'

import { useEffect, useState } from 'react'

interface CopyButtonProps {
    text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setError(null)
        } catch (err) {
            setError('Failed to copy to clipboard')
            console.error('Copy failed:', err)
        }
    }

    useEffect(() => {
        if (copied || error) {
            const timeoutId = setTimeout(() => {
                setCopied(false)
                setError(null)
            }, 2000)
            return () => clearTimeout(timeoutId)
        }
    }, [copied, error])

    return (
        <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
            {error ?? (copied ? 'Copied!' : 'Copy')}
        </button>
    )
}
