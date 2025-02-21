import React from 'react'
import { Input } from '@ui'
import { Plus } from 'lucide-react'

interface IFormActionWrapperProps {
  formAction: (payload: FormData) => void
  placeholder: string
  isPending: boolean
  errors?: string[]
}

const FormActionWrapper = ({
  formAction,
  placeholder,
  isPending,
  errors,
}: IFormActionWrapperProps) => {
  return (
    <form action={formAction} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Input
          id="content"
          name="content"
          type="text"
          placeholder={placeholder}
          className="pr-12"
          disabled={isPending}
          errors={errors}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
      </div>
    </form>
  )
}

export default FormActionWrapper
