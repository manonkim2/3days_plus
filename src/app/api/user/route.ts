import { NextRequest, NextResponse } from 'next/server'
import db from '@/utils/db'

export async function POST(request: NextRequest) {
  console.log(request)
  try {
    const raw = await request.json()

    const identity = raw.identities?.[1] ?? raw.identities?.[0]

    if (!identity?.identity_id) {
      return NextResponse.json({ error: 'No identity found' }, { status: 400 })
    }

    const user = await db.user.upsert({
      where: { id: identity.identity_id },
      update: {},
      create: {
        id: identity.identity_id,
        name: raw.user_metadata?.name ?? '',
        email: raw.email ?? '',
        updated_at: raw.updated_at ?? new Date().toISOString(),
        image_url: raw.user_metadata?.avatar_url ?? '',
        social: identity.provider ?? 'unknown',
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
