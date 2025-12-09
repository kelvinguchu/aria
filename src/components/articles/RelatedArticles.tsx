'use client'

import { ArticleCard } from './ArticleCard'
import type { ArticleListItem } from '@/lib/article-actions'

interface RelatedArticlesProps {
  readonly articles: ArticleListItem[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="bg-neutral-100 py-16 sm:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-dark-blue text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((relatedArticle) => (
            <ArticleCard key={relatedArticle.id} article={relatedArticle} />
          ))}
        </div>
      </div>
    </section>
  )
}
