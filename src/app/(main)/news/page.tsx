import { SelectedKeywordProvider } from './context'
import NewsKeyword from './components/NewsKeyword'
import NewsList from './components/NewsList'

const NewsPage = async () => {
  return (
    <SelectedKeywordProvider>
      <h1 className="text-6xl font-poppins text-center py-8">Keyword News</h1>
      <NewsKeyword />
      <NewsList />
    </SelectedKeywordProvider>
  )
}

export default NewsPage
