'use client'

import React, { useActionState, useState } from 'react'
import {
  createTask,
  deleteTask,
  getTask,
  ITask,
  updateCheckTask,
  updateContentTask,
} from '../taskActions'
import Checkbox from '@/components/Checkbox'
import FormActionWrapper from '@/components/FormActionWrapper'
import { Calendar, Input } from '@/components/ui'
import Box from '@/components/Box'
import { formatKstTime } from '@/utils/formatKstTime'
import { Combobox } from '@/components/Combobox'
import { createCategory, ICategory } from '../categoryActions'
import { Pencil, Plus, Save, Trash2 } from 'lucide-react'

const TaskInput = ({
  tasks,
  categories,
}: {
  tasks: ITask[]
  categories: ICategory[]
}) => {
  const [date, setDate] = useState<Date>(formatKstTime(new Date()))
  const [category, setCategory] = useState<{
    value: string
    id: number
  } | null>(null)
  const [categoryList, setCategoryList] = useState<ICategory[]>(categories)
  const [taskList, setTaskList] = useState<ITask[]>(tasks)
  const [editTask, setEditTask] = useState<{
    id: number
    content: string
  } | null>(null)
  const [editCategory, setEditCategory] = useState<{
    value: string
    id: number
  } | null>(null)

  const handleChangeDate = async (date: Date | undefined) => {
    if (date) {
      setDate(date)
    }

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const [, categoryFormAction, isPendingCategory] = useActionState(
    async (prevTasks: ICategory[] | undefined, formData: FormData) => {
      const updatedCategory = await createCategory(prevTasks, formData)

      if (updatedCategory) {
        setCategoryList(updatedCategory)
      }
      return updatedCategory
    },
    categories,
  )

  const [, formAction, isPending] = useActionState(
    async (_: void, formData: FormData) => {
      await createTask(undefined, formData, date, category?.id)

      const tasks = await getTask(date)
      setTaskList(tasks)
      setCategory(null)
    },
    undefined,
  )

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id)

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    await updateCheckTask(id, completed)

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const startEditingTask = (
    id: number,
    content: string,
    categoryId: number | null,
  ) => {
    setEditTask({ id, content })

    if (categoryId) {
      const category = categoryList.find((c) => c.id === categoryId)
      setEditCategory({ id: category?.id ?? 0, value: category?.title ?? '' })
    }
  }

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editTask) {
      setEditTask({ ...editTask, content: event.target.value })
    }
  }

  const handleSaveEdit = async () => {
    if (editTask) {
      await updateContentTask(editTask.id, editTask.content, editCategory?.id)

      const tasks = await getTask(date)
      setTaskList(tasks)

      setEditTask(null)
    }
  }

  return (
    <div className="flex">
      <Box>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => handleChangeDate(date)}
          className="rounded-md border shadow"
        />
      </Box>

      {/* category */}
      <Box>
        <div className="flex gap-xs">
          <Combobox
            items={categoryList.map((item) => {
              return { value: item.title, id: item.id }
            })}
            value={category}
            setStateAction={setCategory}
            commandInput={
              <FormActionWrapper
                placeholder="Add category name"
                button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
                formAction={categoryFormAction}
                isPending={isPendingCategory}
              />
            }
          />
          <FormActionWrapper
            formAction={formAction}
            placeholder="Add your task"
            isPending={isPending}
            button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
          />
        </div>

        {/* task */}
        {taskList?.map(({ id, completed, content, categoryId }) => {
          const category = categoryList.find((c) => c.id === categoryId)

          return (
            <div key={id} className="flex items-center w-full">
              {editTask?.id !== id ? (
                <div className="flex justify-between w-full">
                  <div onClick={() => handleToggleTask(id, completed)}>
                    <Checkbox
                      checked={completed}
                      text={content}
                      badge={category?.title}
                    />
                  </div>
                  <div className="flex items-center gap-sm">
                    <div
                      onClick={() => startEditingTask(id, content, categoryId)}
                      className="cursor-pointer"
                    >
                      <Pencil className="h-4 w-4 opacity-50" />
                    </div>
                    <div
                      onClick={() => handleDeleteTask(id)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 opacity-50" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-xs">
                  <Combobox
                    items={categoryList.map((item) => {
                      return { value: item.title, id: item.id }
                    })}
                    value={editCategory}
                    setStateAction={setEditCategory}
                    commandInput={
                      <FormActionWrapper
                        placeholder="Add category name"
                        button={
                          <Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        }
                        formAction={categoryFormAction}
                        isPending={isPendingCategory}
                      />
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Password"
                    value={editTask.content}
                    onChange={(event) => handleChangeTask(event)}
                    button={
                      <button
                        aria-label="edit Task"
                        type="submit"
                        onClick={handleSaveEdit}
                      >
                        <Save className="h-4 w-4 opacity-70" />
                      </button>
                    }
                  />
                </div>
              )}
            </div>
          )
        })}
      </Box>
    </div>
  )
}

export default TaskInput
