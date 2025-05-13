import { Metadata } from 'next'
import { NewsProvider } from '@/context/NewsContext'
import NewsKeyword from './components/NewsKeyword'
import NewsList from './components/NewsList'

export const metadata: Metadata = {
  title: '3Days+ | Personalized News Feed',
  description:
    'Follow the latest news based on your selected keywords. Stay informed while managing your daily routines with 3Days+.',
}

const NewsPage = () => {
  return (
    <NewsProvider>
      <h1 className="sr-only">
        3Days+ | 키워드 뉴스 구독 (Personalized News Feed)
      </h1>
      <h2 className="text-6xl font-poppins text-center pt-[140px]">
        Keyword News
      </h2>
      <NewsKeyword />
      <NewsList />
    </NewsProvider>
  )
}

export default NewsPage
