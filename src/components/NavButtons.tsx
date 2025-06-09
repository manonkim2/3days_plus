'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/cn'

const buttonTheme = {
  variant: {
    primary: 'bg-primary text-fontTertiary',
    secondary: 'border-primary border text-fontPrimary',
    tertiary: 'text-fontTertiary',
  },
}

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
        <button
          className={cn(
            'rounded-full font-poppins text-sm sm:text-base py-xs sm:py-sm px-md sm:px-lg',
            buttonTheme.variant[variant],
          )}
        >
          {menu}
        </button>
      </Link>
    )
  }

  return (
    <div className="flex gap-xs sm:gap-md">
      {navButton('Dashboard')}
      {navButton('Schedule')}
      {navButton('News')}
    </div>
  )
}

export default NavButtons
