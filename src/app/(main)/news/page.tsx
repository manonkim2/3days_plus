import { getNewsKeyword } from './actions'
import { SelectedKeywordProvider } from './context'
import KeywordInput from './components/keywordInput'
import NewsList from './components/newsList'

const NewsPage = async () => {
  const keywords = await getNewsKeyword()

  return (
    <SelectedKeywordProvider>
      <KeywordInput keywordsData={keywords} />
      <NewsList />
    </SelectedKeywordProvider>
  )
}

export default NewsPage
