import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="container mx-auto my-16 flex flex-col justify-center border-t-2 border-border p-6">
            <Link
                className="text-center"
                target={'_blank'}
                href={'https://github.com/giacomocamerano/jackcamerano.com'}
            >
                Blog footer
            </Link>
        </footer>
    )
}

export default Footer
