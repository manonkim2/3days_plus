import Link from 'next/link'

import Box from '@/components/Box'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline'

const Login = () => {
  return (
    <div className="w-[400px] h-[500px]">
      <Box>
        <span className="text-xl pt-sm">Login</span>

        <div className="flex gap-sm justify-center items-center">
          <Link href="/google/login" className="flex h-5">
            <GoogleIcon />
          </Link>
          <Link href="/google/start">
            <KakaoIcon />
          </Link>
        </div>

        <div className="flex flex-col py-xl gap-sm">
          <label className="input input-bordered flex items-center">
            <EnvelopeIcon className="size-4" />
            <input type="text" className="grow input-xs" placeholder="Email" />
          </label>
          <label className="input input-bordered flex items-center">
            <KeyIcon className="size-4" />
            <input
              type="text"
              className="grow input-xs"
              placeholder="Password"
            />
          </label>
        </div>

        <button className="btn btn-primary">Login</button>

        <div className="flex justify-center mt-xl">
          <span className="text-xs">Don't have an account?</span>
          <a href="#" className="text-xs text-primary pl-xs">
            <Link href="/signup">Sign up</Link>
          </a>
        </div>
      </Box>
    </div>
  )
}

export default Login
