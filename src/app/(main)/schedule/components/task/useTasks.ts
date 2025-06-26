'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategory, getTask, ICategory } from './actions'
import { ITask } from '@/types/schedule'
import { useDateStore } from '@/stores/useDateStore'
import { getDate } from '@/utils/formmattedDate'

export const useTasks = () => {
  const { date } = useDateStore()

  const { data: tasks = [], isLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', getDate(date)],
    queryFn: ({ queryKey }) => {
      const [, date] = queryKey
      return getTask(new Date(date as string))
    },
  })

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  })

  return {
    tasks,
    categories,
    isLoading: isLoading || isCategoriesLoading,
  }
}
