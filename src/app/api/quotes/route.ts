import { getQuotes } from '@/app/(main)/dashboard/actions'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const quotes = await getQuotes()

  return NextResponse.json(quotes, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=1800, stale-while-revalidate=600', // 30분 캐싱
    },
  })
}
