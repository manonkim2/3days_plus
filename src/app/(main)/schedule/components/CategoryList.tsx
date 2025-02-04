'use client'

import React, { useState } from 'react'

import {
  deleteCategory,
  getTaskInCategory,
  ICategory,
} from '../categoryActions'
import { Trash2 } from 'lucide-react'
import AlertButton from '@/components/AlertButton'
import { Badge } from '@/components/ui'
import { getShortDate } from '@/utils/useFormmattedDate'

const CategoryList = ({ categories }: { categories: ICategory[] }) => {
  const [categoryList, setCategoryList] = useState<ICategory[]>(categories)
  const [taskList, setTaskList] = useState<
    | {
        id: number
        content: string
        completed: boolean
        date: Date
      }[]
    | null
  >(null)

  const handleSelectCategory = async (id: number) => {
    const filteredTasks = await getTaskInCategory(id)

    if (filteredTasks) {
      setTaskList(filteredTasks)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    const updatedTasks = await deleteCategory(id)
    setCategoryList(updatedTasks)
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-sm">
        {categoryList?.map(({ id, title }) => (
          <Badge
            key={id}
            className="flex gap-sm cursor-pointer"
            variant={'outline'}
            onClick={() => handleSelectCategory(id)}
          >
            {title}
            <AlertButton
              button={<Trash2 className="h-4 w-4" />}
              alertTitle="Are you sure you want to delete the category?"
              description="The category is removed from all tasks."
              action={() => handleDeleteCategory(id)}
            />
          </Badge>
        ))}
      </div>

      <div className="flex flex-col gap-sm px-sm py-md ">
        {taskList?.map((task) => {
          return (
            <div key={task.id} className="flex gap-sm">
              <span>{getShortDate(task.date)}</span>
              <span>{task.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList
