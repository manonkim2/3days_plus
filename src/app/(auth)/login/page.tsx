'use client'

import Link from 'next/link'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { Input } from '@/components/ui'
import { KeyRound, Mail } from 'lucide-react'

const Login = () => {
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
        <Link href="/oauth/google">
          <GoogleIcon />
        </Link>
        <Link href="/oauth/kakao">
          <KakaoIcon />
        </Link>
      </div>

      <div className="flex justify-center mt-xl">
        <span className="text-xs">Don&apos;t have an account?</span>
        <Link href="/signup" className="text-xs text-primary pl-xs underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default Login
