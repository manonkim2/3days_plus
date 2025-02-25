'use client'

import React, { useActionState, useState } from 'react'
import {
  createTask,
  deleteTask,
  getTask,
  ITask,
  updateCheckTask,
  updateContentTask,
} from '../actions/taskActions'
import Checkbox from '@/components/Checkbox'
import FormActionWrapper from '@/components/FormActionWrapper'
import { Input } from '@/components/ui'
import { Combobox } from '@/components/Combobox'
import { createCategory, ICategory } from '../actions/categoryActions'
import { Pencil, Save, Trash2 } from 'lucide-react'
import { useDateContext } from '../context'

const TaskInput = ({
  tasks,
  categories,
}: {
  tasks: ITask[]
  categories: ICategory[]
}) => {
  const { date } = useDateContext()

  const [category, setCategory] = useState<{
    value: string
    id: number
  } | null>(null)
  const [taskList, setTaskList] = useState<ITask[]>(tasks)
  const [editTask, setEditTask] = useState<{
    id: number
    content: string
  } | null>(null)
  const [editCategory, setEditCategory] = useState<{
    value: string
    id: number
  } | null>(null)

  const [categoryList, categoryFormAction, isPendingCategory] = useActionState(
    createCategory,
    categories,
  )

  const [, formAction, isPending] = useActionState<ITask[], FormData>(
    async (prevTasks, formData) => {
      await createTask(formData, date, category?.id)

      const tasks = await getTask(date)
      setTaskList(tasks)
      setCategory(null)

      return tasks ?? prevTasks
    },
    tasks ?? [],
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
      setEditCategory(null)
    }
  }

  return (
    <div className="flex gap-md w-full h-[250px]">
      {/* category */}
      <div className="flex gap-sm h-9">
        <Combobox
          items={categoryList.map((item) => {
            return { value: item.title, id: item.id }
          })}
          value={category}
          setStateAction={setCategory}
          commandInput={
            <FormActionWrapper
              placeholder="Add category name"
              formAction={categoryFormAction}
              isPending={isPendingCategory}
            />
          }
        />
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add your task"
          isPending={isPending}
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
    </div>
  )
}

export default TaskInput
