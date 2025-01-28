'use client'

import React, { useActionState, useState } from 'react'

import { PlusIcon } from '@heroicons/react/24/outline'
import FormActionWrapper from '@/components/FormActionWrapper'
import { createCategory, ICategory } from '../categoryActions'

const Category = ({ categories }: { categories: ICategory[] }) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(categories)

  const [, formAction, isPending] = useActionState(
    async (prevTasks: ICategory[] | undefined, formData: FormData) => {
      const updatedCategory = await createCategory(prevTasks, formData)

      if (updatedCategory) {
        setCategoryList(updatedCategory)
      }
      return updatedCategory
    },
    categories,
  )

  return (
    <div className="flex">
      {categoryList.map(({ id, title, color }) => (
        <div key={id} className={`border p-xs ${color}`}>
          <p className="text-sm">{title}</p>
        </div>
      ))}
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
