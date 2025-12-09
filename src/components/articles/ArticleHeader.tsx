'use client'

import Link from 'next/link'
import { HiArrowLeft, HiCalendar } from 'react-icons/hi2'

interface ArticleHeaderProps {
  readonly title: string
  readonly formattedDate?: string | null
}

export function ArticleHeader({ title, formattedDate }: ArticleHeaderProps) {
  return (
    <header className="max-w-5xl mx-auto -mt-16 sm:-mt-24 relative z-10">
      {/* White card container */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-lg">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center text-coral text-sm font-medium hover:underline mb-6 cursor-pointer group"
        >
          <HiArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Date */}
        {formattedDate && (
          <div className="flex items-center gap-2 text-dark-blue/50 text-sm sm:text-base font-medium mb-4">
            <HiCalendar className="w-4 h-4" />
            <time>{formattedDate}</time>
          </div>
        )}

        {/* Title */}
        <h1 className="text-dark-blue text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>
      </div>
    </header>
  )
}
