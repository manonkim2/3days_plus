'use client'

import { usePathname } from 'next/navigation'
import Button from './Button'
import Link from 'next/link'

const NavButtons = () => {
  const pathName = usePathname()

  const navButton = (menu: string) => {
    const _menu = menu.toLowerCase()
    const isDashboard = _menu === 'dashboard'

    const isCurrent = isDashboard ? pathName === '/' : `/${_menu}` === pathName

    const href = isDashboard ? '/' : `/${_menu}`
    const variant = isCurrent ? 'primary' : 'tertiary'

    return (
      <Link href={href}>
        <Button text={menu} variant={variant} />
      </Link>
    )
  }

  return (
    <div className="gap-2 sm:gap-10 flex">
      {navButton('Dashboard')}
      {navButton('Schedule')}
      {navButton('News')}
    </div>
  )
}

export default NavButtons
