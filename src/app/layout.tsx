import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Interport from './interport'
import { cn } from '@/lib/utils'
import { CookiesProvider } from 'next-client-cookies/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blast point example',
  description: 'Generated by create next app',
}
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html style={{ backgroundColor: 'black' }} lang="en">
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <CookiesProvider>
          <Interport children={children}></Interport>
        </CookiesProvider>
      </body>
    </html>
  )
}
