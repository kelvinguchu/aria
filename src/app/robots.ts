import { MetadataRoute } from 'next'

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://aria.ke' : 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/articles-sitemap.xml`],
    host: BASE_URL,
  }
}
