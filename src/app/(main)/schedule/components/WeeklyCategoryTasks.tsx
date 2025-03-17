'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ICategory } from '../actions/categoryActions'
import { useTaskContext } from '../context'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui'
import AlertButton from '@/components/AlertButton'
import { getShortDate } from '@/utils/formmattedDate'

const WeeklyCategoryTasks = ({ categories }: { categories: ICategory[] }) => {
  const { weekTasks } = useTaskContext()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  return (
    <div className="flex flex-col min-w-[180px] w-[200px]">
      <span className="text-sm font-semibold py-sm">
        Weekly Tasks by Category
      </span>

      <Accordion
        type="single"
        collapsible
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        {categories?.map(({ id, title }) => {
          const filteredTasks = weekTasks.filter(
            (task) => task.categoryId === id,
          )
          const completedTasks = filteredTasks.filter((task) => task.completed)
          const inProgressTasks = filteredTasks.filter(
            (task) => !task.completed,
          )

          return (
            <AccordionItem key={id} value={String(id)}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                {selectedCategory === String(id) && (
                  <div className="flex flex-col gap-sm">
                    {filteredTasks.length > 0 ? (
                      <>
                        {/* Completed Tasks */}
                        <div>
                          <span className="text-xs font-semibold text-gray-500">
                            ✅ Completed
                          </span>

                          {completedTasks.length > 0 ? (
                            completedTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex gap-xs items-center opacity-50 pt-xs"
                              >
                                <Badge variant="outline">
                                  {getShortDate(task.date)}
                                </Badge>
                                <p className="text-sm">{task.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 text-center">
                              No Completed Tasks
                            </p>
                          )}
                        </div>

                        {/* In Progress Tasks */}
                        <div className="pt-sm">
                          <span className="text-xs font-semibold text-gray-500">
                            📌 In Progress
                          </span>
                          {inProgressTasks.length > 0 ? (
                            inProgressTasks.map((task) => (
                              <div
                                key={task.id}
                                className="flex gap-xs items-center pt-xs"
                              >
                                <Badge variant="outline">
                                  {getShortDate(task.date)}
                                </Badge>
                                <p className="text-sm">{task.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400">
                              No Tasks in Progress
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-gray-500">
                        No tasks for this category this week.
                      </p>
                    )}

                    {/* category delete button */}
                    <AlertButton
                      alertTitle="Delete Category"
                      description="Deleting a category will also delete all of its to-do lists. Are you sure you want to proceed?"
                      action={() => console.log(`Deleting category ${id}`)}
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
          )
        })}
      </Accordion>
    </div>
  )
}

export default WeeklyCategoryTasks
