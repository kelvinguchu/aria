import React from 'react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Toaster } from '@/components/ui/sonner'
import { GoogleAnalytics } from '@/components/analytics'
import { siteConfig } from '@/lib/seo-config'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'ARIA Capital Residency | Official Website',
    template: '%s | ARIA Capital Residency',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  icons: {
    icon: '/favicon.webp',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'ARIA Capital Residency | Official Website',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'ARIA Capital Residency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARIA Capital Residency | Official Website',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default async function RootLayout(props: { readonly children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.className}>
      <body>
        <GoogleAnalytics />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
        <Toaster />
      </body>
    </html>
  )
}
