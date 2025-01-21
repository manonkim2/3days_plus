import { ButtonHTMLAttributes } from 'react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
}

const buttonTheme = {
  variant: {
    primary: 'bg-primary text-fontSecondary',
    secondary: 'border-primary border text-fontPrimary',
    tertiary: 'text-fontPrimary',
  },
  size: {
    sm: 'text-xs py-xs px-sm',
    md: 'text-base py-sm px-lg',
    lg: 'text-lg py-sm px-lg',
  },
}

const Button = ({
  text,
  variant = 'primary',
  size = 'md',
  disabled,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={`${buttonTheme.variant[variant]} ${buttonTheme.size[size]}  rounded-full text-base ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button
