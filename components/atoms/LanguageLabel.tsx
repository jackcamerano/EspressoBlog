interface LanguageLabelProps {
    language: string
}

export const LanguageLabel = ({ language }: LanguageLabelProps) => {
    return (
        <span className="lang-label absolute bottom-1 right-4 mb-2 block w-fit text-xs font-medium uppercase text-gray-400">
            {language}
        </span>
    )
}
