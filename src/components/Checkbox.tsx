'use client'

import { Checkbox } from './ui/checkbox'

interface ICheckboxProps {
  text: string
  value?: boolean
  disabled?: boolean
}

const Checkboxx = ({ text, value, disabled }: ICheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 py-sm">
      <Checkbox id="terms" checked={value} disabled={disabled} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  )
}

export default Checkboxx
