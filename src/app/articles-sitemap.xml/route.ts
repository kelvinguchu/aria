import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://aria.ke' : 'http://localhost:3000')

export async function GET() {
  const payload = await getPayload({ config })

  // Fetch all articles
  const result = await payload.find({
    collection: 'articles',
    limit: 1000, // Adjust based on expected article count
    sort: '-publishedAt',
  })

  const articles = result.docs

  // Build Google News Sitemap XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles
  .map((article) => {
    const publicationDate = article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : new Date(article.createdAt).toISOString()

    return `  <url>
    <loc>${BASE_URL}/articles/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>ARIA Capital Residency</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`
  })
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
