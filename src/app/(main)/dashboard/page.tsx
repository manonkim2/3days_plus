import { format } from 'date-fns'
import Parser from 'rss-parser'

import { getUserInfo } from '@/utils/supabase/actions'
import News from './compnents/News'
import { NewsCardItem, RssFeed } from '@/types/rss'

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
  console.log('🚀 ~ DashBoardPage ~ news:', news)

  const newsCardItems: NewsCardItem[] = news.items.map((item) => ({
    no: item.no,
    title: item.title,
    content: item.content,
    contentSnippet: item.contentSnippet,
    pubDate: item.pubDate,
    link: item.link,
    enclosureUrl: item['media:content']?.$?.url,
  }))

  return (
    <div>
      <div className="mb-xxl font-poppins">
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Hello,</span>
          <span className="text-3xl font-semibold">
            {user?.name || 'Everybody'}
          </span>
        </div>
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Today is</span>
          <span className="text-3xl font-semibold" suppressHydrationWarning>
            {format(new Date(), 'EEEE, MMMM do')}
          </span>
        </div>
      </div>
      <News newsItems={newsCardItems} />
      <div className="grid gap-8"></div>
    </div>
  )
}

export default DashBoardPage
