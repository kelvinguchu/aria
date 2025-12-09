'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useCallback } from 'react'
import { getArticles, type ArticlesResponse } from '@/lib/article-actions'
import { ArticleCard } from './ArticleCard'

interface ArticlesListProps {
  readonly initialData: ArticlesResponse
}

export function ArticlesList({ initialData }: ArticlesListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: async ({ pageParam = 1 }) => {
      return await getArticles(pageParam)
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  })

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [handleObserver])

  if (status === 'error') {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading articles: {(error as Error).message}</p>
      </div>
    )
  }

  const allArticles = data?.pages.flatMap((page) => page.articles) ?? []

  if (allArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-blue/50 text-lg">No articles found.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {allArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="py-8 text-center">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2 text-dark-blue/50">
            <div className="animate-spin h-5 w-5 border-2 border-dark-blue/20 border-t-dark-blue rounded-full" />
            <span>Loading more articles...</span>
          </div>
        )}
        {!isFetchingNextPage && hasNextPage && (
          <p className="text-dark-blue/30 text-sm">Scroll for more</p>
        )}
        {!isFetchingNextPage && !hasNextPage && allArticles.length > 0 && (
          <p className="text-dark-blue/30 text-sm">You&apos;ve reached the end</p>
        )}
      </div>
    </div>
  )
}
