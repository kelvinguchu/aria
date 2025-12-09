'use client'

import Image from 'next/image'

interface ArticleHeroProps {
  readonly imageUrl?: string
  readonly imageAlt: string
}

export function ArticleHero({ imageUrl, imageAlt }: ArticleHeroProps) {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
      {imageUrl ? (
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-dark-blue/80 to-transparent" />
    </div>
  )
}
