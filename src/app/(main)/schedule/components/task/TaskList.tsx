'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Save, Trash2 } from 'lucide-react'
import {
  createCategory,
  createTask,
  deleteTask,
  updateCheckTask,
  updateContentTask,
} from './actions'
import Checkbox from '@/components/Checkbox'
import FormActionWrapper from '@/components/FormActionWrapper'
import { Input } from '@/components/ui'
import { Combobox } from '@/app/(main)/schedule/components/TaskCategoryCombobox'
import { useTaskContext } from '../../context'
import { useTasks } from './useTasks'
import LoadingOverlay from '@/components/LoadingOverlay'

const TaskInput = () => {
  const queryClient = useQueryClient()
  const { date } = useTaskContext()
  const { tasks, categories, isLoading } = useTasks(date)

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
      queryClient.invalidateQueries({
        queryKey: ['tasks', date.toDateString()],
      })
      setCategory(null)
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', date.toDateString()],
      })
    },
  })

  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateCheckTask(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', date.toDateString()],
      })
    },
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
      queryClient.invalidateQueries({
        queryKey: ['tasks', date.toDateString()],
      })
      setEditTask(null)
      setEditCategory(null)
    },
  })

  const handleDeleteTask = (id: number) => {
    deleteTaskMutation.mutate(id)
  }

  const handleToggleTask = (id: number, completed: boolean) => {
    toggleTaskMutation.mutate({ id, completed })
  }

  const startEditingTask = (
    id: number,
    content: string,
    categoryId: number | null,
  ) => {
    setEditTask({ id, content })

    if (categoryId) {
      const category = categories.find((c) => c.id === categoryId)
      if (category) {
        setEditCategory({ id: category.id, value: category.title })
      }
    }
  }

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  if (isLoading) return <LoadingOverlay />

  return (
    <div className="flex flex-col gap-md w-full pl-md max-h-[40vh] overflow-auto">
      <div className="grid grid-cols-[1fr_3fr] gap-sm h-9">
        <Combobox
          items={categories?.map((item) => ({
            value: item.title,
            id: item.id,
          }))}
          value={category}
          setStateAction={setCategory}
          commandInput={
            <FormActionWrapper
              placeholder="Add category name"
              formAction={createCategoryMutation.mutate}
              isPending={createCategoryMutation.isPending}
            />
          }
        />
        <FormActionWrapper
          formAction={createTaskMutation.mutate}
          placeholder="Add your task"
          isPending={createTaskMutation.isPending}
        />
      </div>

      {tasks.length === 0 && (
        <p className="flex justify-center items-center py-12 text-base text-fontSecondary border border-dashed rounded-md h-full">
          Let&apos;s plan your day!
        </p>
      )}

      <div className="flex flex-col gap-xs">
        {tasks.map(({ id, completed, content, categoryId }) => {
          const categoryTitle = categories.find(
            (c) => c.id === categoryId,
          )?.title

          return (
            <div key={id}>
              {editTask?.id !== id ? (
                <div className="flex justify-between w-full px-xs">
                  <div onClick={() => handleToggleTask(id, completed)}>
                    <Checkbox
                      checked={completed}
                      text={content}
                      badge={categoryTitle}
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
                    items={categories.map((item) => ({
                      value: item.title,
                      id: item.id,
                    }))}
                    value={editCategory}
                    setStateAction={setEditCategory}
                  />
                  <Input
                    type="text"
                    placeholder="Edit task..."
                    value={editTask.content}
                    onChange={handleChangeTask}
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

export default TaskInput
