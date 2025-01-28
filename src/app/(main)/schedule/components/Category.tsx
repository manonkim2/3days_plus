'use client'

import React, { useActionState } from 'react'

import { PlusIcon } from '@heroicons/react/24/outline'
import FormActionWrapper from '@/components/FormActionWrapper'
import { createCategory } from '../categoryActions'

const Category = () => {
  const [state, formAction, isPending] = useActionState(createCategory, '')

  return (
    <div className="flex">
      <FormActionWrapper
        placeholder="Add category name"
        button={<PlusIcon className="w-4 cursor-pointer" />}
        formAction={formAction}
        isPending={isPending}
      />
    </div>
  )
}

export default Category
