'use client'

import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Save, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import {
  createCategory,
  createTask,
  deleteCategory,
  deleteTask,
  updateCheckTask,
  updateContentTask,
} from './actions'
import { useTasks } from './useTasks'
import LoadingOverlay from '@/components/LoadingOverlay'
import { useDateStore } from '@/stores/useDateStore'
import { FormActionWrapper, Input, CustomCheckbox } from '@/components/shared'
import Combobox from './Combobox'

const TaskList = () => {
  const queryClient = useQueryClient()
  const { date } = useDateStore()
  const { tasks, categories, isLoading } = useTasks()

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

  const refreshTasks = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['tasks', format(date, 'yyyy-MM-dd')],
    })
  }, [queryClient, date])

  const createCategoryMutation = useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category'],
      })
    },
  })

  const createTaskMutation = useMutation({
    mutationFn: (formData: FormData) =>
      createTask(formData, date, category?.id),
    onSuccess: () => {
      refreshTasks()
      setCategory(null)
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: refreshTasks,
  })

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateCheckTask(id, completed),
    onSuccess: refreshTasks,
  })

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      content,
      categoryId,
    }: {
      id: number
      content: string
      categoryId?: number
    }) => updateContentTask(id, content, categoryId),
    onSuccess: () => {
      refreshTasks()
      setEditTask(null)
      setEditCategory(null)
    },
  })

  const handleStartEdit = (
    id: number,
    content: string,
    categoryId: number | null,
  ) => {
    setEditTask({ id, content })
    const cat = categories.find((c) => c.id === categoryId)
    if (cat) setEditCategory({ id: cat.id, value: cat.title })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editTask) {
      setEditTask({ ...editTask, content: event.target.value })
    }
  }

  const handleSaveEdit = () => {
    if (editTask) {
      updateTaskMutation.mutate({
        id: editTask.id,
        content: editTask.content,
        categoryId: editCategory?.id,
      })
    }
  }

  const handleDeleteCategory = useCallback(
    async (id: number) => {
      if (!id) return
      await deleteCategory(id)
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
    [queryClient],
  )

  if (isLoading) return <LoadingOverlay />

  return (
    <div className="flex flex-col h-full gap-md w-full overflow-y-scroll max-h-[35vh]">
      <div className="grid grid-cols-[1fr_3fr] gap-sm">
        <Combobox
          items={categories?.map(({ id, title }) => ({
            id,
            value: title,
          }))}
          value={category}
          setStateAction={setCategory}
          handleDeleteCategory={handleDeleteCategory}
          formAction={createCategoryMutation.mutate}
        />
        <FormActionWrapper
          formAction={createTaskMutation.mutate}
          placeholder="Add your task"
          disabled={createTaskMutation.isPending}
        />
      </div>

      {tasks.length === 0 && (
        <p className="flex justify-center items-center py-12 text-base text-fontSecondary border border-dashed rounded-md h-full">
          Let&apos;s plan your day!
        </p>
      )}

      <div className="flex flex-col h-full gap-xs overflow-auto">
        {tasks.map(({ id, completed, content, categoryId }) => {
          const category = categories.find((c) => c.id === categoryId)
          const isEditing = editTask?.id !== id

          return (
            <div key={id}>
              {isEditing ? (
                <div className="flex justify-between w-full px-xs">
                  <CustomCheckbox
                    id={`task-${id}`}
                    checked={completed}
                    text={content}
                    badge={category?.title}
                    onClick={() => toggleTaskMutation.mutate({ id, completed })}
                  />

                  <div className="flex items-center gap-sm">
                    <Pencil
                      className="h-4 w-4 opacity-50 cursor-pointer"
                      onClick={() => handleStartEdit(id, content, categoryId)}
                    />
                    <Trash2
                      className="h-4 w-4 opacity-50 cursor-pointer"
                      onClick={() => deleteTaskMutation.mutate(id)}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[1fr_3fr] gap-sm">
                  <Combobox
                    items={categories.map(({ id, title }) => ({
                      id,
                      value: title,
                    }))}
                    value={editCategory}
                    setStateAction={setEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                    formAction={createCategoryMutation.mutate}
                  />
                  <Input
                    type="text"
                    placeholder="Edit task..."
                    value={editTask?.content}
                    onChange={handleInputChange}
                    onSave={handleSaveEdit}
                    button={<Save className="h-4 w-4 opacity-50" />}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
