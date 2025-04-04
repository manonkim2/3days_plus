'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CircleUser } from 'lucide-react'
import Button from './Button'
import { cn } from '@/utils/cn'
import { useUser } from '@/context/UserContext'

export interface UserInfo {
  id: string
  name: string
  email: string
  image_url: string | null
  social: string
}

const Navbar = () => {
  const { user } = useUser()
  const pathName = usePathname()

  const navButton = (menu: string) => {
    const _menu = menu.toLowerCase()
    const isDashboard = _menu === 'dashboard'

    const isCurrent = isDashboard
      ? pathName === '/' || pathName === '/dashboard'
      : `/${_menu}` === pathName

    const href = isDashboard ? '/' : `/${_menu}`
    const variant = isCurrent ? 'primary' : 'tertiary'

    return (
      <Link href={href}>
        <Button text={menu} variant={variant} />
      </Link>
    )
  }

  return (
    <nav
      className={cn(
        `flex items-center justify-between container h-[var(--navbar-height)] top-0 z-40`,
      )}
    >
      <Link href="/">Title</Link>

      <div className="gap-2 sm:gap-10 flex">
        {navButton('Dashboard')}
        {navButton('Schedule')}
        {navButton('News')}
      </div>

      <Link className="rounded-full overflow-hidden" href="/profile">
        {user ? (
          <Image
            src={user.image_url || ''}
            alt="user_image"
            width={36}
            height={36}
          />
        ) : (
          <CircleUser className="h-8 w-8 opacity-70" strokeWidth={1.3} />
        )}
      </Link>
    </nav>
  )
}

export default Navbar
