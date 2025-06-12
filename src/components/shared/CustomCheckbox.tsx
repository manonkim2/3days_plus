'use client'

import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'

interface ICheckboxProps {
  id: string
  text: string
  checked?: boolean
  disabled?: boolean
  badge?: string
  onClick?: () => void
}

const CustomCheckbox = ({
  id,
  text,
  checked,
  disabled,
  badge,
  onClick,
}: ICheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 py-sm">
      <div onClick={onClick} className="flex">
        <Checkbox id={id} checked={checked} disabled={disabled} />
      </div>
      {badge && <Badge variant="outline">{badge}</Badge>}
      <label
        htmlFor={id}
        className={`text-base text-fontPrimary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${checked ? 'line-through text-gray-500' : ''}`}
      >
        {text}
      </label>
    </div>
  )
}

export default CustomCheckbox
