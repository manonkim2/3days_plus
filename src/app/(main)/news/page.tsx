import { NewsProvider } from '@/context/NewsContext'
import NewsKeyword from './components/NewsKeyword'
import NewsList from './components/NewsList'

const NewsPage = async () => {
  return (
    <NewsProvider>
      <h1 className="text-6xl font-poppins text-center py-8">Keyword News</h1>
      <NewsKeyword />
      <NewsList />
    </NewsProvider>
  )
}

export default NewsPage
