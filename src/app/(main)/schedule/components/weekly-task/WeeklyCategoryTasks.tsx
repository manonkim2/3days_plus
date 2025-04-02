'use client'

import { Trash2 } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui'
import AlertButton from '@/components/AlertButton'
import { getShortDate } from '@/utils/formmattedDate'
import { useTasks } from '../task/useTasks'
import { useTaskContext } from '@/context/TaskContext'

const WeeklyCategoryTasks = () => {
  const { setSelectedCategoryId, weekTaskList } = useTaskContext()
  const { categories } = useTasks()

  return (
    <div className="flex flex-col min-w-[180px] w-[300px] max-h-[280px] overflow-y-auto border-l pl-md">
      <span className="text-sm font-semibold py-sm">
        Weekly Tasks by Category
      </span>

      <Accordion
        type="single"
        collapsible
        onValueChange={(value) =>
          setSelectedCategoryId(value ? Number(value) : null)
        }
      >
        {categories?.map(({ id, title }) => {
          const filteredTasks = weekTaskList.filter(
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
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default WeeklyCategoryTasks
