import React from 'react'
import type { Metadata } from 'next'
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

/**
 * Site metadata, taken from the reference build's own <head>.
 *
 * The browser-tab icon is `src/app/favicon.ico` — Next picks that filename up
 * by convention, so it needs no entry here. It is the reference's own icon
 * (a 16px + 32px multi-size .ico), not a re-render.
 *
 * `metadataBase` matters: without it Next cannot turn the relative OG image
 * path into the absolute URL that scrapers require, and it silently warns
 * instead of failing, so a missing one shows up only as a blank social card.
 */
const SITE_NAME = 'Enrichers Investment Group'
const SITE_DESCRIPTION =
  'Trade PSX equities and PMEX commodities with a licensed broker. Research, risk management and 24/5 client support from Lahore since 2011.'
const OG_TITLE = 'Enrichers — SECP-regulated PSX & PMEX broker in Pakistan'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  // The reference appends its variant label to the tab title; `template` keeps
  // inner pages to "<Page> · Enrichers" rather than repeating the whole line.
  title: {
    default: `${OG_TITLE} · Candidate A (Clear Path)`,
    template: '%s · Enrichers',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/brand/enrichers-logo-enhanced.png',
        width: 1140,
        height: 396,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/brand/enrichers-logo-enhanced.png'],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${albertSans.variable} ${sourceSans3.variable}`}>
      <body>
        <Header />
        <main className="page-blocks">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
