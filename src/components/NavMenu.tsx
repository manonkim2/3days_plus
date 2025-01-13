'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './Button'

const NavMenu = () => {
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
    <div className="gap-10 flex">
      {navButton('Dashboard')}
      {navButton('Schedule')}
      {navButton('Routines')}
      {navButton('News')}
    </div>
  )
}

export default NavMenu
