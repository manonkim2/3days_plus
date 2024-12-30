'use client'

import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const buttonTheme = {
  variant: {
    primary: 'bg-primary text-fontSecondary',
    secondary: 'border-primary border text-fontPrimary',
    tertiary: 'text-fontPrimary',
  },
}

const Button = ({
  text,
  onClick,
  variant = 'primary',
  disabled,
  ...rest
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${buttonTheme.variant[variant]} py-sm px-lg rounded-full`}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button
