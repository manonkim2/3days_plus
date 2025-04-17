import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { temperature, feels_like, description, humidity, wind } = body

  const prompt = `
  현재 날씨 정보는 다음과 같아:
  - 기온: ${temperature}°C
  - 체감 온도: ${feels_like}°C
  - 날씨 상태: ${description}
  - 습도: ${humidity}%
  - 바람: ${wind} m/s
  
  이 날씨에 맞는 옷차림을 친절하고 따뜻한 말투로 60자이내로 한 문장만 추천해줘`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    const suggestion = response.choices[0]?.message?.content?.trim()

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('OpenAI 요청 중 오류 발생:', error)
    return NextResponse.json(
      { error: '추천을 생성하는 데 실패했습니다.' },
      { status: 500 },
    )
  }
}
