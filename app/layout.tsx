import localFont from 'next/font/local'

import Footer from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'
import { ThemeProvider } from '@/components/theme/theme-provider'

import type { Metadata } from 'next'
import './globals.css'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans'
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono'
})

export const metadata: Metadata = {
    title: 'Home | Blogify',
    description:
        'Blogify is an open-source nextjs blog template design with tailwind CSS.'
}

const RootLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-grid-small-black/5 dark:bg-grid-small-white/5`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
