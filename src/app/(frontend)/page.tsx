import React from 'react'
import { Metadata } from 'next'

import { Header, Footer } from '@/components/layout'
import {
  Hero,
  About,
  About2,
  Amenities,
  Amenities2,
  ExperienceAria,
  FloorPlans,
  Location,
  PreviousProjects,
  Contact,
} from '@/components/landing'
import { siteConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'ARIA Capital Residency | Premium Luxury Living in Nairobi',
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'ARIA Capital Residency | Premium Luxury Living in Nairobi',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'ARIA Capital Residency Exterior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARIA Capital Residency | Premium Luxury Living in Nairobi',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.webp`,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
}

// JSON-LD for Real Estate Listing
const realEstateJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateJsonLd) }}
      />
      <Header />
      <Hero />
      <About />
      <About2 />
      <Amenities />
      <Amenities2 />
      <ExperienceAria />
      <Location />
      <FloorPlans />
      <PreviousProjects />
      <Contact />
      <Footer />
    </>
  )
}
