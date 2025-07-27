export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { getUserInfo } from '@/lib/supabase/actions'
import { Footer } from '@/components/shared'
import NewsList from './components/NewsList'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getNewsKeyword } from './actions'
import { prefetch } from '@/lib/prefetch'

export const metadata: Metadata = {
  title: '3Days+ | Personalized News Feed',
  description:
    'Follow the latest news based on your selected keywords. Stay informed while managing your daily routines with 3Days+.',
}

const NewsPage = async () => {
  const queryClient = new QueryClient()
  const user = await getUserInfo()

  if (user) {
    await prefetch(queryClient, ['news-keywords'], getNewsKeyword)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="sr-only">
        3Days+ | 키워드 뉴스 구독 (Personalized News Feed)
      </h1>
      <NewsList isUser={Boolean(user)} />
      <Footer />
    </HydrationBoundary>
  )
}

export default NewsPage
