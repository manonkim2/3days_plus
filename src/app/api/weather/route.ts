import { getWeather } from '@/lib/getWeather'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const city = req.nextUrl.searchParams.get('city') || 'Seoul'
  const weather = await getWeather(city)

  return NextResponse.json(weather, {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
    },
  })
}
