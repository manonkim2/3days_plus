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
    const { origin } = new URL(request.url)
    return redirectToLogin(origin)
  }
}

async function authenticateUser(
  code: string,
): Promise<{ error: Error | null; user: ISessionUserType | null }> {
  const supabase = await serverCreateClient()

  try {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    return { error, user: data?.user as ISessionUserType | null }
  } catch (err) {
    console.error('[Auth Error] Failed to authenticate user:', err)
    return { error: err as Error, user: null }
  }
}

async function ensureUserExists(user: ISessionUserType) {
  // google, kakao 동일 email 일 때 identities[1]이 현재 login
  const identity = user.identities!
  const socialLogin = identity?.length > 1 ? identity[1] : identity[0]

  try {
    const existingUser = await db.user.findUnique({
      where: { id: socialLogin.identity_id },
    })

    if (!existingUser) {
      await db.user.create({
        data: {
          id: socialLogin.identity_id,
          name: user.user_metadata.name,
          email: user.email,
          updated_at: user.updated_at,
          image_url: user.user_metadata.avatar_url,
          social: socialLogin.provider,
        },
      })
    }
  } catch (error) {
    console.error('[DB Error] Failed to upsert user:', error)
    throw error
  }
}
