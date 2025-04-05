'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
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

      const identity = user.identities?.[0]
      const payload = {
        id: identity?.identity_id || '',
        email: user.email || '',
        name: user.user_metadata?.name || '',
        image_url: user.user_metadata?.avatar_url || '',
        social: identity?.provider || '',
      }

      setUser(payload)

      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
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
