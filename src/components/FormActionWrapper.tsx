import React from 'react'

interface IFormActionWrapperProps {
  formAction: (payload: FormData) => void
  placeholder: string
  button: React.ReactNode
  isPending: boolean
}

const FormActionWrapper = ({
  formAction,
  placeholder,
  button,
  isPending,
}: IFormActionWrapperProps) => {
  return (
    <div>
      <form action={formAction}>
        <label className="input flex items-center">
          <input
            name="content"
            type="text"
            placeholder={placeholder}
            className="input-ghost input-sm w-full"
          />
          <button aria-label={placeholder} type="submit" disabled={isPending}>
            {button}
          </button>
        </label>
      </form>
    </div>
  )
}

export default FormActionWrapper
