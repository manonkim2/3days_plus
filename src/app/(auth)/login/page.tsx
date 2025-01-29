'use client'

import Link from 'next/link'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/ui'

const Login = () => {
  return (
    <div className="w-[400px] h-[500px]">
      <span className="text-xl pt-sm">Login</span>
      <div className="flex flex-col py-xl gap-sm">
        <Input
          type="text"
          placeholder="Email"
          icon={<EnvelopeIcon className="size-4" />}
        />
        <Input
          type="text"
          placeholder="Email"
          icon={<KeyIcon className="size-4" />}
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
