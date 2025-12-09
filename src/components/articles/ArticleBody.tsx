'use client'

import Image from 'next/image'
import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'

interface ArticleBodyProps {
  readonly body: unknown
}

// Custom upload converter that uses Next.js Image
const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode
}> = ({ node }) => {
  const uploadDoc = node.value
  if (typeof uploadDoc !== 'object' || !uploadDoc) {
    return null
  }
  const { alt, height, url, width } = uploadDoc as {
    alt?: string
    height?: number
    url?: string
    width?: number
  }

  if (!url) return null

  return (
    <figure className="my-8">
      <div className="relative w-full overflow-hidden rounded-xl">
        <Image
          alt={alt || ''}
          height={height || 600}
          src={url}
          width={width || 1200}
          className="w-full h-auto object-cover"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-dark-blue/50 text-sm mt-3 italic">{alt}</figcaption>
      )}
    </figure>
  )
}

// Custom JSX converters for better rendering
const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  // Override upload to use next/image
  upload: ({ node }) => <CustomUploadComponent node={node} />,
})

export function ArticleBody({ body }: ArticleBodyProps) {
  if (!body) return null

  return (
    <div className="max-w-5xl mx-auto bg-white px-2 sm:px-10 lg:px-12 py-4">
      <article
        className="prose prose-lg lg:prose-xl max-w-none
        prose-headings:text-dark-blue prose-headings:font-bold
        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-dark-blue/10 prose-h2:pb-2
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
        prose-p:text-dark-blue/80 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-coral prose-a:no-underline hover:prose-a:underline
        prose-strong:text-dark-blue prose-strong:font-semibold
        prose-ul:my-4 prose-ul:pl-6
        prose-ol:my-4 prose-ol:pl-6
        prose-li:text-dark-blue/80 prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-coral prose-blockquote:bg-coral/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-dark-blue/70
        prose-code:bg-dark-blue/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-coral prose-code:text-sm
        prose-pre:bg-dark-blue prose-pre:text-white prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-6
        prose-img:rounded-xl prose-img:my-8
        prose-hr:border-dark-blue/10 prose-hr:my-8
      "
      >
        <RichText converters={jsxConverters} data={body as SerializedEditorState} />
      </article>
    </div>
  )
}
