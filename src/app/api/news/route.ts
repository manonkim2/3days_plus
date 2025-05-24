import { RssNewsType, RssFeed } from '@/types/rss'
import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

export const GET = async () => {
  const parser = new Parser({
    customFields: {
      item: ['media:content', 'no'],
    },
  })

  const news = (await parser.parseURL(
    'https://www.mk.co.kr/rss/30000001/',
  )) as RssFeed

  const newsCardItems: RssNewsType[] = news.items
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

  return NextResponse.json(newsCardItems, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=1800, stale-while-revalidate=1200', // 30분 캐싱, 20분 revalidate
    },
  })
}
