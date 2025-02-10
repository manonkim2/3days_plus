import * as React from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode
  button?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, button, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            icon ? 'pl-10' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {button && (
          <span
            className="absolute right-3 top-[55%] -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            {button}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
