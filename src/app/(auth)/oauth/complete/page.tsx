'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@/context/UserContext'

const OAuthHandler = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const { setUser } = useUser()

  useEffect(() => {
    const handleOAuth = async () => {
      if (!code) return

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        console.error('[OAuth Error|getUser]:', error?.message)
        router.push('/login')
        return
      }

      const identity = user.identities!
      const socialLogin = identity?.length > 1 ? identity[1] : identity[0]

      setUser({
        id: socialLogin.identity_id,
        name: user.user_metadata.name,
        email: user.email || '',
        updated_at: user.updated_at || '',
        image_url: user.user_metadata.avatar_url,
        social: socialLogin.provider,
      })

      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })

        if (!res.ok) {
          console.error('[OAuth Error|DB Upsert]:', await res.text())
          router.push('/login')
          return
        }

        router.push('/')
      } catch (err) {
        console.error('[OAuth Error|fetch failed]:', err)
        router.push('/login')
      }
    }

    handleOAuth()
  }, [code, router, setUser])

  return <div>로그인 처리 중...</div>
}

const OAuthCompletePage = () => {
  return (
    <Suspense fallback={<div>로그인 처리 중...</div>}>
      <OAuthHandler />
    </Suspense>
  )
}

export default OAuthCompletePage
