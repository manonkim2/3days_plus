import Parser from 'rss-parser'

import News from './compnents/News'
import { getUserInfo } from '@/utils/supabase/actions'
import { NewsCardItem, RssFeed } from '@/types/rss'
import Title from './compnents/Title'
import CustomImage from './compnents/CustomImage'

const DashBoardPage = async () => {
  const user = await getUserInfo()

  const parser = new Parser({
    customFields: {
      item: ['media:content', 'no'],
    },
  })

  const news = (await parser.parseURL(
    'https://www.mk.co.kr/rss/30000001/',
  )) as RssFeed

  const newsCardItems: NewsCardItem[] = news.items
    .map((item) => ({
      no: item.no,
      title: item.title,
      content: item.content,
      contentSnippet: item.contentSnippet,
      pubDate: item.pubDate,
      link: item.link,
      enclosureUrl: item['media:content']?.$?.url,
    }))
    .filter((item) => item.enclosureUrl)
    .slice(0, 10)

  return (
    <div className="pb-xxl">
      <div className="font-poppins h-screen bg-[#1E1E1E]">
        <Title userName={user?.name} />
        <CustomImage />
      </div>
      <News newsItems={newsCardItems.slice(0, 10)} />
    </div>
  )
}

export default DashBoardPage
