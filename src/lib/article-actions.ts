'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export interface ArticleListItem {
  id: string
  title: string
  slug: string
  image: {
    url: string
    alt: string
  }
  publishedAt?: string | null
  createdAt: string
}

export interface ArticlesResponse {
  articles: ArticleListItem[]
  hasNextPage: boolean
  nextPage: number | null
  totalDocs: number
  totalPages: number
}

export interface ArticleDetail {
  id: string
  title: string
  slug: string
  image: {
    url: string
    alt: string
    width?: number | null
    height?: number | null
  }
  body: unknown // Lexical rich text JSON
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

const ARTICLES_PER_PAGE = 15

/**
 * Get paginated articles for the listing page
 */
export async function getArticles(page: number = 1): Promise<ArticlesResponse> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    page,
    limit: ARTICLES_PER_PAGE,
    sort: '-publishedAt',
    depth: 1, // Populate the image relationship
  })

  const articles: ArticleListItem[] = result.docs.map((doc) => {
    const image = typeof doc.image === 'object' && doc.image !== null ? doc.image : null

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      image: {
        url: image?.url || '',
        alt: image?.alt || doc.title,
      },
      publishedAt: doc.publishedAt,
      createdAt: doc.createdAt,
    }
  })

  return {
    articles,
    hasNextPage: result.hasNextPage,
    nextPage: result.hasNextPage ? page + 1 : null,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
  }
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1, // Populate the image relationship
  })

  if (result.docs.length === 0) {
    return null
  }

  const doc = result.docs[0]
  const image = typeof doc.image === 'object' && doc.image !== null ? doc.image : null

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    image: {
      url: image?.url || '',
      alt: image?.alt || doc.title,
      width: image?.width,
      height: image?.height,
    },
    body: doc.body,
    publishedAt: doc.publishedAt,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

/**
 * Get random related articles (excluding current article)
 */
export async function getRelatedArticles(
  currentArticleId: string,
  count: number = 3,
): Promise<ArticleListItem[]> {
  const payload = await getPayload({ config })

  // First get total count of other articles
  const totalResult = await payload.find({
    collection: 'articles',
    where: {
      id: {
        not_equals: currentArticleId,
      },
    },
    limit: 0, // Only get count
  })

  const totalDocs = totalResult.totalDocs

  if (totalDocs === 0) {
    return []
  }

  // Calculate random skip offset
  const maxSkip = Math.max(0, totalDocs - count)
  const randomSkip = Math.floor(Math.random() * (maxSkip + 1))

  const result = await payload.find({
    collection: 'articles',
    where: {
      id: {
        not_equals: currentArticleId,
      },
    },
    limit: count,
    page: Math.floor(randomSkip / count) + 1,
    depth: 1,
    sort: '-publishedAt',
  })

  return result.docs.map((doc) => {
    const image = typeof doc.image === 'object' && doc.image !== null ? doc.image : null

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      image: {
        url: image?.url || '',
        alt: image?.alt || doc.title,
      },
      publishedAt: doc.publishedAt,
      createdAt: doc.createdAt,
    }
  })
}

/**
 * Generate static params for all article slugs (for static generation)
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  // Fetch all with pagination if needed
  const allSlugs: string[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const pageResult = await payload.find({
      collection: 'articles',
      page,
      limit: 100,
      depth: 0,
    })

    allSlugs.push(...pageResult.docs.map((doc) => doc.slug))
    hasMore = pageResult.hasNextPage
    page++
  }

  return allSlugs
}
