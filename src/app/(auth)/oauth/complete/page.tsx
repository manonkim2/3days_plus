'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/browser'
import { Loader2 } from 'lucide-react'
import { IUserInfo } from '@/lib/supabase/actions'

const getOAuthUser = async (provider: string | null): Promise<IUserInfo> => {
  const supabase = createSupabaseClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) throw new Error('Failed to fetch user')

  const identity =
    user.identities?.find((i) => i.provider === provider) ??
    user.identities?.[0]

  return {
    id: identity?.identity_id || '',
    email: user.email || '',
    name: user.user_metadata?.name || '',
    image_url: user.user_metadata?.avatar_url || '',
    social: provider,
  }
}

const registerUser = async (payload: IUserInfo) => {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error('User registration failed')
}

const OAuthHandler = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const user = await getOAuthUser(provider)
        await registerUser(user)
        router.replace('/')
      } catch (err) {
        console.error('[OAuth Error]:', err)
        router.replace('/login')
      }
    }

    if (code) handleOAuth()
  }, [code, provider, router])

  return null
}

const OAuthCompletePage = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-2 font-poppins">
      <Loader2 className="w-5 h-5 animate-spin text-fontPrimary" />
      <p className="text-fontPrimary">로그인 처리 중입니다...</p>

      {/* CSR Bailout 방지용 Suspense 경계 */}
      <Suspense fallback={null}>
        <OAuthHandler />
      </Suspense>
    </div>
  )
}

export default OAuthCompletePage
