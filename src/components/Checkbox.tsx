'use client'

import { useState } from 'react'

interface ICheckboxProps {
  text: string
  onClick?: () => void
}

const Checkbox = ({ text, onClick }: ICheckboxProps) => {
  const [checked, setChecked] = useState(false)

  const onClickCheckbox = () => {
    setChecked(!checked)
  }

  return (
    <div className="form-control flex items-start py-xs">
      <label className="label cursor-pointer gap-sm">
        <input
          onClick={onClickCheckbox}
          type="checkbox"
          className="checkbox checkbox-sm border-primary [--chkbg:black] [--chkfg:white]"
          checked={checked}
        />
        <span
          className={`label-text ${checked ? 'text-fontSecondary' : 'text-fontPrimary'} ${checked && 'line-through'}`}
        >
          {text}
        </span>
      </label>
    </div>
  )
}

export default Checkbox
