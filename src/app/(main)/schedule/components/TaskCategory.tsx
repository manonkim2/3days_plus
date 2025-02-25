'use client'

import React, { useState } from 'react'
import { getTaskInCategory, ICategory } from '../actions/categoryActions'
import { getShortDate } from '@/utils/formmattedDate'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui'

const TaskCategory = ({ categories }: { categories: ICategory[] }) => {
  const [taskList, setTaskList] = useState<
    | {
        id: number
        content: string
        completed: boolean
        date: Date
      }[]
    | null
  >(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSelectCategory = async (id: number) => {
    if (selectedCategory === String(id)) {
      setSelectedCategory(null)
      setTaskList(null) // 선택 해제 시 taskList 초기화
      return
    }

    setSelectedCategory(String(id))
    setTaskList(null) // 새로운 카테고리를 선택할 때 기존 taskList를 즉시 초기화

    const filteredTasks = await getTaskInCategory(id)
    setTaskList(filteredTasks) // 새로운 taskList를 불러온 후 업데이트
  }

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
            <AccordionTrigger onClick={() => handleSelectCategory(id)}>
              {title}
            </AccordionTrigger>
            <AccordionContent>
              {selectedCategory === String(id) && taskList && (
                <div className="flex flex-col gap-xs">
                  {taskList.map((task) => (
                    <div key={task.id} className="flex gap-xs items-center">
                      <Badge variant="outline">{getShortDate(task.date)}</Badge>
                      <p className="text-sm">{task.content}</p>
                    </div>
                  ))}
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
