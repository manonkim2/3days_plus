'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategory, getTask, ICategory, ITask } from './actions'

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

  return { tasks, categories, isLoading: isTasksLoading || isCategoriesLoading }
}
