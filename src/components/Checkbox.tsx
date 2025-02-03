'use client'

import { Badge } from './ui/badge'
import { Checkbox as CheckboxUI } from './ui/checkbox'

interface ICheckboxProps {
  text: string
  checked?: boolean
  disabled?: boolean
  badge?: string
}

const Checkbox = ({ text, checked, disabled, badge }: ICheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 py-sm">
      <CheckboxUI id="terms" checked={checked} disabled={disabled} />
      {badge && <Badge variant="outline">{badge}</Badge>}
      <label
        htmlFor="terms"
        className={`text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${checked ? 'line-through text-gray-500' : ''}`}
      >
        {text}
      </label>
    </div>
  )
}

export default Checkbox
