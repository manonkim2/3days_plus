'use client'

import React, { useState } from 'react'

import { deleteCategory, ICategory } from '../categoryActions'
import { Trash2 } from 'lucide-react'

const Category = ({ categories }: { categories: ICategory[] }) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(categories)

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
            <Trash2 className="h-4 w-4 opacity-50" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category
