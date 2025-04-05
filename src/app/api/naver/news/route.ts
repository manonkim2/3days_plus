import { NextRequest, NextResponse } from 'next/server'

export interface INaverNews {
  display: number
  items: {
    title: string
    originallink: string
    link: string
    description: string
    pubDate: string
  }[]
  lastBuildDate: string
  start: number
  total: number
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const page = Number(searchParams.get('page')) || 1
  const display = 12
  const start = (page - 1) * display + 1

  const url = `https://openapi.naver.com/v1/search/news?query=${encodeURIComponent(
    query || '',
  )}&start=${start}&display=${display}`

  const res = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_NEWS_CLIENT_ID!,
      'X-Naver-Client-Secret': process.env.NAVER_NEWS_CLIENT_SECRET!,
    },
    cache: 'no-store',
  })

  const data: INaverNews = await res.json()
  return NextResponse.json(data)
}
