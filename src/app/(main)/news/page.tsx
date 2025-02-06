import { getNewsKeyword } from './actions'
import { SelectedKeywordProvider } from './context'
import NewsKeyword from './components/NewsKeyword'
import NewsList from './components/NewsList'

const NewsPage = async () => {
  const keywords = await getNewsKeyword()

  return (
    <SelectedKeywordProvider>
      <NewsKeyword keywordsData={keywords} />
      <NewsList />
    </SelectedKeywordProvider>
  )
}

export default NewsPage
