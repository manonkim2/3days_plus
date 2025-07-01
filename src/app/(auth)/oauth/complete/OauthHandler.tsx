'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { signOut } from '@/lib/supabase/actions'

const OAuthHandler = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const provider = searchParams.get('provider')

  useEffect(() => {
    const handleOAuth = async () => {
      await signOut()
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

      const identity =
        user.identities && user.identities.length > 1
          ? user.identities?.find((item) => item.provider === provider)
          : user.identities?.[0]

      const payload = {
        id: identity?.identity_id || '',
        email: user.email || '',
        name: user.user_metadata?.name || '',
        image_url: user.user_metadata?.avatar_url || '',
        social: provider,
      }

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

        window.location.href = '/'
      } catch (err) {
        console.error('[OAuth Error|fetch failed]:', err)
        router.push('/login')
      }
    }

    handleOAuth()
  }, [code, provider, router])

  return (
    <div className="flex items-center justify-center h-screen font-poppins gap-sm">
      <Loader2 className="w-5 h-5 animate-spin text-fontPrimary" />
      <p className="text-fontPrimary">Loading user info...</p>
    </div>
  )
}

const OauthHandler = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen font-poppins gap-sm">
          <Loader2 className="w-5 h-5 animate-spin text-fontPrimary" />
          <p className="text-fontPrimary">Loading user info...</p>
        </div>
      }
    >
      <OAuthHandler />
    </Suspense>
  )
}

export default OauthHandler
