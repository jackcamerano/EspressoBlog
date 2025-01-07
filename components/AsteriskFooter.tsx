import { Asterisk } from 'lucide-react'

export const AsteriskFooter = () => {
    return (
        <div className="my-10 flex w-full items-center rounded-full">
            <div className="flex-1 border-b"></div>
            <span className="flex flex-row px-8 py-3 text-lg font-semibold leading-8">
                <Asterisk />
                <Asterisk />
                <Asterisk />
            </span>
            <div className="flex-1 border-b"></div>
        </div>
    )
}
