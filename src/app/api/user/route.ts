import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSiteEnv } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    const { id, email, name, image_url, social } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Missing identity ID' },
        { status: 400 },
      )
    }

    const user = await db.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        email,
        name,
        image_url,
        social,
        environment: getSiteEnv(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('[POST /api/user]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
