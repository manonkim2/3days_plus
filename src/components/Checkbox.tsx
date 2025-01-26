'use client'

interface ICheckboxProps {
  text?: string
  value?: boolean
  onClick?: () => void
  disabled?: boolean
}

const Checkbox = ({ text, value, onClick, disabled }: ICheckboxProps) => {
  return (
    <div className="form-control flex items-start py-xs">
      <label className="label cursor-pointer gap-sm">
        <input
          onClick={onClick}
          type="checkbox"
          className="checkbox checkbox-sm border-primary [--chkbg:black] [--chkfg:white]"
          checked={value}
          disabled={disabled}
          readOnly
        />
        <span
          className={`label-text ${value ? 'text-fontSecondary' : 'text-fontPrimary'} ${value && 'line-through'}`}
        >
          {text}
        </span>
      </label>
    </div>
  )
}

export default Checkbox
