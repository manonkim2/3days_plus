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
    <div className="flex items-center w-full justify-between h-16 fixed top-0 left-0 px-6 z-40 bg-bgPrimary">
      <span>Titile</span>
      <div className="gap-10 flex">
        <Link href="/">
          <Button
            text="Dashboard"
            variant={pathName === '/' ? 'primary' : 'tertiary'}
          />
        </Link>
        {navButton('Schedule')}
        {navButton('Routines')}
        {navButton('News')}
      </div>
      <div>
        <UserCircleIcon className="size-10" />
      </div>
    </div>
  )
}

export default Navbar
