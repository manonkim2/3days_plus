'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'

const OAuthCompletePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

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

        router.push('/dashboard')
      } catch (err) {
        console.error('[OAuth Error|fetch failed]:', err)
        router.push('/login')
      }
    }

    handleOAuth()
  }, [code, router])

  return <div>로그인 처리 중...</div>
}

export default OAuthCompletePage
