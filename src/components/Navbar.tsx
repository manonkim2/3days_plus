export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { CircleUser } from 'lucide-react'
import { cn } from '@/utils/cn'
import NavButtons from './NavButtons'
import { getUserInfo } from '@/lib/supabase/actions'

export interface UserInfo {
  id: string
  name: string
  email: string
  image_url: string | null
  social: string
}

const Navbar = async () => {
  const user = await getUserInfo()

  return (
    <nav
      className={cn(
        `flex items-center justify-between container h-[var(--navbar-height)] fixed top-0 left-0 right-0 z-40`,
      )}
    >
      <Link href="/">Title</Link>

      <NavButtons />

      <Link className="rounded-full overflow-hidden" href="/profile">
        {user?.image_url ? (
          <Image
            src={user.image_url || ''}
            alt="user_image"
            width={36}
            height={36}
          />
        ) : (
          <CircleUser
            className="h-8 w-8 opacity-70"
            strokeWidth={1.3}
            aria-label="user_icon"
          />
        )}
      </Link>
    </nav>
  )
}

export default Navbar
