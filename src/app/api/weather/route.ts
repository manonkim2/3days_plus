import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!city || !apiKey) {
    return NextResponse.json(
      { error: 'Missing city or API key' },
      { status: 400 },
    )
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city,
  )}&appid=${apiKey}&units=metric`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    const error = await res.text()
    return NextResponse.json({ error }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
