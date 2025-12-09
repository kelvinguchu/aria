import { Metadata } from 'next'
import { getArticles } from '@/lib/article-actions'
import { ArticlesList } from '@/components/articles/ArticlesList'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Articles | ARIA Capital Residency',
  description: 'Read the latest news and insights about ARIA Capital Residency',
}

export default async function ArticlesPage() {
  // Fetch initial data on the server
  const initialData = await getArticles(1)

  return (
    <>
      <Header forceScrolledStyle />
      <main className="min-h-screen bg-neutral-100 pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-dark-blue/50 text-base sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
              News & Insights
            </p>
            <h1 className="text-coral text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              Articles
            </h1>
          </div>

          {/* Articles List with React Query Provider */}
          <QueryProvider>
            <ArticlesList initialData={initialData} />
          </QueryProvider>
        </div>
      </main>
      <Footer />
    </>
  )
}
