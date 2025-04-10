'use client'

import { NewsProvider } from '@/context/NewsContext'
import NewsKeyword from './components/NewsKeyword'
import NewsList from './components/NewsList'

const NewsPage = () => {
  return (
    <NewsProvider>
      <h1 className="text-6xl font-poppins text-center pt-[140px]">
        Keyword News
      </h1>
      <NewsKeyword />
      <NewsList />
    </NewsProvider>
  )
}

export default NewsPage
