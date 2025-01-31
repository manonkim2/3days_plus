import Link from 'next/link'
import Box from '@/components/Box'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import { Input } from '@/components/ui'
import { KeyRound, Mail, UserRound } from 'lucide-react'

const Signup = () => {
  return (
    <div className="w-[400px] h-[500px]">
      <Box>
        <span className="text-xl pt-sm">Create Account</span>
        <div className="flex flex-col py-xl gap-sm">
          <Input
            type="text"
            placeholder="Username"
            icon={<UserRound className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
          />
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
          <Input
            type="text"
            placeholder="Password Confirm"
            icon={<KeyRound className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
          />
        </div>
        <button className="btn btn-primary">Create Account</button>

        <div className="flex gap-sm justify-center items-center py-md">
          <Link href="/oauth/google">
            <GoogleIcon />
          </Link>
          <Link href="/oauth/kakao">
            <KakaoIcon />
          </Link>
        </div>

        <div className="flex justify-center mt-xl gap-xs ">
          <span className="text-xs">Already have an account?</span>
          <Link href="/login" className="text-xs underline">
            Log in
          </Link>
        </div>
      </Box>
    </div>
  )
}

export default Signup
