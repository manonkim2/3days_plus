'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteCategory,
  getCategory,
  getTask,
  ICategory,
  ITask,
} from './actions'

export const useTasks = (date?: Date) => {
  const { data: tasks = [], isLoading: isTasksLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', date?.toISOString()],
    queryFn: () => getTask(date),
  })

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  })

  const queryClient = useQueryClient()

  const handleOnClickDelete = async (id: number) => {
    if (!id) return
    await deleteCategory(id)
    queryClient.invalidateQueries({ queryKey: ['category'] })
  }

  return {
    tasks,
    categories,
    isLoading: isTasksLoading || isCategoriesLoading,
    handleOnClickDelete,
  }
}
