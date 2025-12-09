import Image from 'next/image'
import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi2'
import type { ArticleListItem } from '@/lib/article-actions'
import { Card, CardContent } from '@/components/ui/card'

interface ArticleCardProps {
  readonly article: ArticleListItem
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link href={`/articles/${article.slug}`} className="group block cursor-pointer">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {article.image.url ? (
            <Image
              src={article.image.url}
              alt={article.image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>

        <CardContent className="pb-2">
          {/* Date */}
          {formattedDate && (
            <time className="text-dark-blue/50 text-xs sm:text-sm font-medium">
              {formattedDate}
            </time>
          )}

          {/* Title */}
          <h3 className="text-dark-blue text-lg sm:text-xl font-bold mt-2 line-clamp-2 group-hover:text-coral transition-colors">
            {article.title}
          </h3>

          {/* Read More */}
          <span className="inline-flex items-center text-coral text-sm font-medium mt-4 group-hover:underline">
            Read Article
            <HiArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
