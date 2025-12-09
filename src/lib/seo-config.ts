export const siteConfig = {
  name: 'ARIA Capital Residency',
  description:
    'ARIA Capital Residency - Premium residential living in Nairobi, Kenya. Discover luxury apartments with world-class amenities.',
  url: process.env.NODE_ENV === 'production' ? 'https://aria.ke' : 'http://localhost:3000',
  ogImage: '/EXTERIORS/ARIA-Exterior.webp',
  defaultOgImage: '/logo.webp',
  keywords: [
    'ARIA Capital Residency',
    'Nairobi apartments',
    'luxury apartments Kenya',
    'premium residency Nairobi',
    'Kenya real estate',
    'residential living Nairobi',
  ],
  authors: [{ name: 'ARIA Capital Residency' }],
  creator: 'ARIA Capital Residency',
  publisher: 'ARIA Capital Residency',
  locale: 'en_US',
  type: 'website',
}
