import React from 'react'
import { Input } from '@ui'

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
    <form action={formAction} className="relative w-full max-w-md">
      <label className="sr-only" htmlFor="content">
        {placeholder}
      </label>
      <div className="relative flex items-center">
        <Input
          id="content"
          name="content"
          type="text"
          placeholder={placeholder}
          className="pr-12"
        />
        <button
          aria-label={placeholder}
          type="submit"
          disabled={isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-1 py-1 transition-opacity disabled:opacity-50"
        >
          {button}
        </button>
      </div>
    </form>
  )
}

export default FormActionWrapper
