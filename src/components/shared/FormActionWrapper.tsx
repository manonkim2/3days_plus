import React from 'react'

import { Plus } from 'lucide-react'
import { Input } from '.'

interface IFormActionWrapperProps {
  formAction: (payload: FormData) => void
  placeholder: string
  disabled: boolean
  errors?: string[]
}

const FormActionWrapper = ({
  formAction,
  placeholder,
  disabled,
  errors,
}: IFormActionWrapperProps) => {
  return (
    <form action={formAction} className="relative w-full">
      <div className="relative flex items-center">
        <Input
          id="content"
          name="content"
          type="text"
          placeholder={placeholder}
          className="pr-12"
          disabled={disabled}
          errors={errors}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
      </div>
    </form>
  )
}

export default FormActionWrapper
