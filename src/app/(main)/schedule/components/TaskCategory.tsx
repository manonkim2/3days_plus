'use client'

import React, { useEffect, useState } from 'react'
import {
  deleteCategory,
  getTaskInCategory,
  ICategory,
  ITaskInCategory,
} from '../actions/categoryActions'
import { getShortDate } from '@/utils/formmattedDate'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui'
import AlertButton from '@/components/AlertButton'
import { Trash2 } from 'lucide-react'

const TaskCategory = ({ categories }: { categories: ICategory[] }) => {
  const [taskList, setTaskList] = useState<ITaskInCategory[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id)
  }

  useEffect(() => {
    setTaskList(null)

    if (!selectedCategory) {
      return
    }

    const fetchTasks = async () => {
      const tasks = await getTaskInCategory(Number(selectedCategory))
      setTaskList(tasks)
    }

    fetchTasks()
  }, [selectedCategory])

  return (
    <div className="flex flex-col border-r-2 pr-md min-w-[180px]">
      <span className="text-sm font-semibold py-sm">Task Category</span>

      <Accordion
        type="single"
        collapsible
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        {categories?.map(({ id, title }) => (
          <AccordionItem key={id} value={String(id)}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              {selectedCategory === String(id) && taskList && (
                <div className="flex flex-col gap-sm">
                  {taskList.map((task) => (
                    <div key={task.id}>
                      <div className="flex gap-xs items-center">
                        <Badge variant="outline">
                          {getShortDate(task.date)}
                        </Badge>
                        <p className="text-sm">{task.content}</p>
                      </div>
                    </div>
                  ))}

                  <AlertButton
                    alertTitle="Delete Category"
                    description="Deleting a category will also delete all of its to-do lists. Are you sure you want to proceed?"
                    action={() => handleDeleteCategory(id)}
                    button={
                      <div className="flex gap-xs items-center justify-center cursor-pointer pt-md">
                        <Trash2 className="opacity-50 w-3 h-3" />
                        <span className="text-xs text-fontSecondary">
                          Delete category
                        </span>
                      </div>
                    }
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default TaskCategory
