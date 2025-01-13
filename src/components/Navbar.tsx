import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import NavMenu from './NavMenu'
import { serverCreateClient } from '@/utils/supabase/server'
import Image from 'next/image'

const Navbar = async () => {
  const supabase = await serverCreateClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="flex items-center justify-between h-16 top-0 z-40 bg-bgPrimary container mx-auto">
      <Link href="/">
        <span>Titile</span>
      </Link>

      <NavMenu />

      <div className="rounded-full overflow-hidden">
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
      </div>
    </nav>
  )
}

export default Navbar
