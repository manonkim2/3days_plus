import { Metadata } from 'next'
import { getUserInfo } from '@/lib/supabase/actions'
import { Footer } from '@/components/shared'
import NewsList from './components/NewsList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '3Days+ | Personalized News Feed',
  description:
    'Follow the latest news based on your selected keywords. Stay informed while managing your daily routines with 3Days+.',
}

const NewsPage = async () => {
  const user = await getUserInfo()

  return (
    <>
      <h1 className="sr-only">
        3Days+ | 키워드 뉴스 구독 (Personalized News Feed)
      </h1>
      <NewsList isUser={Boolean(user)} />
      <Footer />
    </>
  )
}

export default NewsPage
