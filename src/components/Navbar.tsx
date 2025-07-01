import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/utils/cn'
import NavButtons from './NavButtons'
import UserImage from './UserImage'

export interface UserInfo {
  id: string
  email: string
  name: string
  image_url: string | null
  social: string
}

const Navbar = async () => {
  return (
    <nav
      className={cn(
        `container flex items-center justify-between py-sm sm:h-[var(--navbar-height)] fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border border-black/10 rounded-full px-md sm:px-xxl mt-sm sm:mt-md`,
      )}
    >
      <Link href="/">
        <div className="flex items-center gap-xs">
          <Image
            src={'/favicon.png'}
            width={28}
            height={28}
            alt="3days_favicon"
            unoptimized
          />
          <span className="hidden sm:block text-xl font-extrabold font-poppins text-fontTertiary">
            Days+
          </span>
        </div>
      </Link>

      <NavButtons />

      <UserImage />
    </nav>
  )
}

export default Navbar
