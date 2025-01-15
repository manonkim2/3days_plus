import Link from 'next/link'
import Image from 'next/image'

import { getUserInfo } from '@/utils/supabase/actions'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import NavMenu from './NavMenu'

const Navbar = async () => {
  const user = await getUserInfo()

  return (
    <nav className="flex items-center justify-between h-16 top-0 z-40 bg-bgPrimary container mx-auto">
      <Link href="/">
        <span>Titile</span>
      </Link>

      <NavMenu />

      <Link className="rounded-full overflow-hidden" href="/profile">
        {user ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="user_image"
            width={36}
            height={36}
          />
        ) : (
          <UserCircleIcon className="size-10" />
        )}
      </Link>
    </nav>
  )
}

export default Navbar
