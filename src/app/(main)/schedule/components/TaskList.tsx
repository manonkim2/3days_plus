'use client'

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'
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
import { Combobox } from '@/app/(main)/schedule/components/TaskCategoryCombobox'
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

  const [taskList, formAction, isPending] = useActionState<ITask[], FormData>(
    async (_, formData) => {
      createTask(formData, date, category?.id)
      setCategory(null)
      return await getTask(date)
    },
    tasks,
  )

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id)
    startTransition(() => {
      formAction(new FormData())
    })
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    await updateCheckTask(id, completed)
    startTransition(() => {
      formAction(new FormData())
    })
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

      startTransition(() => {
        formAction(new FormData())
        setEditTask(null)
        setEditCategory(null)
      })
    }
  }

  useEffect(() => {
    startTransition(() => {
      formAction(new FormData())
    })
  }, [date, formAction])

  return (
    <div className="flex flex-col gap-md w-full pl-md">
      {/* category/Task create */}
      <div className="grid grid-cols-[1fr_3fr] gap-sm h-9">
        <Combobox
          items={categories?.map((item) => {
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

      {/* taskList */}
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
              <div className="grid grid-cols-[1fr_3fr] gap-sm">
                <Combobox
                  items={categoryList.map((item) => {
                    return { value: item.title, id: item.id }
                  })}
                  value={editCategory}
                  setStateAction={setEditCategory}
                />
                <Input
                  type="text"
                  placeholder="Password"
                  value={editTask.content}
                  onChange={(event) => handleChangeTask(event)}
                  onSave={handleSaveEdit}
                  button={<Save className="h-4 w-4 opacity-50" />}
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
