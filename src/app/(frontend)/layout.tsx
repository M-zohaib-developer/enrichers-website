import React from 'react'
import { Albert_Sans, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'

// Weights match the reference build exactly: it ships Albert Sans 300/400/600/700
// and Source Sans 3 400/600/700. Dropping 700 here would make `font-bold` render
// as a synthesised faux-bold instead of the real cut.
const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-albert-sans',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans-3',
  display: 'swap',
})

export const metadata = {
  description: 'Enrichers Website — Candidate A redesign',
  title: 'Enrichers',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${albertSans.variable} ${sourceSans3.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
