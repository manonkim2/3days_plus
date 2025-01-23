import { NextResponse } from 'next/server'

import { serverCreateClient } from '@/utils/supabase/server'
import db from '@/utils/db'
import { ISessionUserType } from '@/utils/supabase/type'

export async function GET(request: Request) {
  const redirectToLogin = (origin: string) =>
    NextResponse.redirect(`${origin}/login`)

  try {
    const { searchParams, origin } = new URL(request.url)
    const code = await searchParams.get('code')

    if (!code) {
      console.error('Auth code is not provided')
      return redirectToLogin(origin)
    }

    const { error, user } = await authenticateUser(code)

    if (error || !user) {
      console.error('Authentication failed:', error?.message || 'No user found')
      return redirectToLogin(origin)
    }

    await ensureUserExists(user)

    return NextResponse.redirect(`${origin}/dashboard`)
  } catch (error) {
    console.error('Oauth login error:', error)
    return redirectToLogin(origin)
  }
}

async function authenticateUser(
  code: string,
): Promise<{ error: Error | null; user: ISessionUserType }> {
  const supabase = await serverCreateClient()
  const {
    error,
    data: { user },
  } = await supabase.auth.exchangeCodeForSession(code)

  return { error, user: user as ISessionUserType }
}

async function ensureUserExists(user: ISessionUserType) {
  // google, kakao 동일 email 일 때 identities[1]이 현재 login
  const identity = user.identities!
  const social_login = identity?.length > 1 ? identity[1] : identity[0]

  const existingUsers = await db.user.findUnique({
    where: {
      id: social_login.identity_id,
    },
  })

  if (!existingUsers) {
    await db.user.create({
      data: {
        id: social_login.identity_id,
        name: user.user_metadata.name,
        email: user.email,
        updated_at: user.updated_at,
        image_url: user.user_metadata.avatar_url,
        social: social_login.provider,
      },
    })
  }
}
