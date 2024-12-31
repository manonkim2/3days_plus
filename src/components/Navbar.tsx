'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const pathName = usePathname()

  const navButton = (menu: string) => {
    const _menu = menu.toLocaleLowerCase()
    const currentPath = `/${_menu}` === pathName
    const variant = currentPath ? 'primary' : 'tertiary'

    return (
      <Link href={`/${_menu}`}>
        <Button text={menu} variant={variant} />
      </Link>
    )
  }

  return (
    <nav className="flex items-center justify-between h-16 top-0 z-40 bg-bgPrimary container mx-auto">
      <Link href="/">
        <span>Titile</span>
      </Link>
      <div className="gap-10 flex">
        {navButton('Dashboard')}
        {navButton('Schedule')}
        {navButton('Routines')}
        {navButton('News')}
      </div>
      <div>
        <UserCircleIcon className="size-10" />
      </div>
    </nav>
  )
}

export default Navbar
