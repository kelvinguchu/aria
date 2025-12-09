import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles, getAllArticleSlugs } from '@/lib/article-actions'
import { ArticleHero, ArticleHeader, ArticleBody, RelatedArticles } from '@/components/articles'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/lib/seo-config'

interface ArticlePageProps {
  readonly params: Promise<{ slug: string }>
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const articleUrl = `${siteConfig.url}/articles/${slug}`
  const ogImage = article.image.url || siteConfig.defaultOgImage

  return {
    title: article.title,
    description: `Read about ${article.title} - ARIA Capital Residency news and updates.`,
    keywords: ['ARIA Capital Residency', 'news', article.title],
    authors: siteConfig.authors,
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      url: articleUrl,
      siteName: siteConfig.name,
      title: article.title,
      description: `Read about ${article.title} - ARIA Capital Residency news and updates.`,
      images: [
        {
          url: ogImage,
          width: article.image.width || 1200,
          height: article.image.height || 630,
          alt: article.image.alt || article.title,
        },
      ],
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: `Read about ${article.title}`,
      images: [ogImage],
    },
    alternates: {
      canonical: articleUrl,
    },
  }
}

// JSON-LD Structured Data for NewsArticle
function generateArticleJsonLd(article: {
  title: string
  slug: string
  image: { url: string; alt: string }
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}) {
  const articleUrl = `${siteConfig.url}/articles/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: article.image.url ? [article.image.url] : undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    url: articleUrl,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  // Fetch article and related articles in parallel
  const [article, relatedArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticleBySlug(slug).then((a) => (a ? getRelatedArticles(a.id, 3) : [])),
  ])

  if (!article) {
    notFound()
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const jsonLd = generateArticleJsonLd(article)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header forceScrolledStyle />
      <main className="min-h-screen bg-white">
        <ArticleHero imageUrl={article.image.url} imageAlt={article.image.alt} />

        <article className="container mx-auto px-4 lg:px-8">
          <ArticleHeader title={article.title} formattedDate={formattedDate} />
          <ArticleBody body={article.body} />
        </article>

        <RelatedArticles articles={relatedArticles} />
      </main>
      <Footer />
    </>
  )
}
