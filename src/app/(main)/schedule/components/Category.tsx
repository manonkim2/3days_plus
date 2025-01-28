'use client'

import React, { useActionState, useState } from 'react'

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FormActionWrapper from '@/components/FormActionWrapper'
import { createCategory, deleteCategory, ICategory } from '../categoryActions'

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

  const handleDeleteCategory = async (id: number) => {
    const updatedTasks = await deleteCategory(id)
    setCategoryList(updatedTasks)
  }

  return (
    <div className="flex gap-sm">
      {categoryList.map(({ id, title, color }) => (
        <div
          key={id}
          className={`flex gap-sm items-center border rounded-xl px-sm h-6 ${color}`}
        >
          <p className="text-base">{title}</p>
          <div
            onClick={() => handleDeleteCategory(id)}
            className="cursor-pointer"
          >
            <XMarkIcon className="w-3" />
          </div>
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
