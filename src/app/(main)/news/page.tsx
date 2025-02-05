import { getNewsKeyword } from './actions'
import KeywordInput from './components/keywordInput'

const NewsPage = async () => {
  const keywords = await getNewsKeyword()

  return (
    <>
      <KeywordInput keywordsData={keywords} />
    </>
  )
}

export default NewsPage
