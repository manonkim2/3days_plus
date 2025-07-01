'use client'

import { createSupabaseClient } from '@/lib/supabase/browser'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { Button } from '@/components/shared'

const LoginForm = () => {
  const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
    const supabase = createSupabaseClient()
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/oauth/complete?provider=${provider}`

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })

    if (error) {
      alert('로그인에 실패했습니다. 다시 시도해 주세요.')
      console.error('[OAuth Error|login page]:', error.message)
    }
  }
  return (
    <div className="flex flex-col gap-md">
      <Button onClick={() => handleOAuthLogin('google')} variant="outline">
        <GoogleIcon />
        <span>Google</span>
      </Button>
      <Button onClick={() => handleOAuthLogin('kakao')} variant="outline">
        <KakaoIcon />
        <span>Kakao</span>
      </Button>
    </div>
  )
}

export default LoginForm
