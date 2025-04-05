'use client'

import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { Input } from '@/components/ui'
import { KeyRound, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

const Login = () => {
  const handleOAuthLogin = async (provider: 'google' | 'kakao') => {
    const redirectTo =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/oauth/complete'
        : 'https://3daysplus.vercel.app/oauth/complete'

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
    <div className="w-[400px] h-[500px]">
      <span className="text-xl pt-sm">Login</span>
      <div className="flex flex-col py-xl gap-sm">
        <Input
          type="text"
          placeholder="Email"
          icon={<Mail className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
        <Input
          type="text"
          placeholder="Password"
          icon={<KeyRound className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
        <button className="btn btn-primary">Login</button>
      </div>

      <div className="flex gap-sm justify-center items-center py-md">
        <button onClick={() => handleOAuthLogin('google')}>
          <GoogleIcon />
        </button>
        <button onClick={() => handleOAuthLogin('kakao')}>
          <KakaoIcon />
        </button>
      </div>

      {/* <div className="flex justify-center mt-xl">
        <span className="text-xs">Don&apos;t have an account?</span>
        <Link href="/signup" className="text-xs text-primary pl-xs underline">
          Sign up
        </Link>
      </div> */}
    </div>
  )
}

export default Login
