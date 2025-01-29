'use client'

import { Checkbox } from './ui/checkbox'

interface ICheckboxProps {
  text: string
  checked?: boolean
  disabled?: boolean
}

const Checkboxx = ({ text, checked, disabled }: ICheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 py-sm">
      <Checkbox id="terms" checked={checked} disabled={disabled} />
      <label
        htmlFor="terms"
        className={`text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${checked ? 'line-through text-gray-500' : ''}`}
      >
        {text}
      </label>
    </div>
  )
}

export default Checkboxx
