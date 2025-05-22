'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getCategory, getTask, ICategory } from './actions'
import { ITask } from '@/types/schedule'

type UseTasksParams =
  | { date: Date; dates?: undefined }
  | { dates: Date[]; date?: undefined }
  | undefined

export const useTasks = (params: UseTasksParams) => {
  const dates = useMemo(() => {
    if (!params) return []
    if ('date' in params) return [params.date]
    return params.dates ?? []
  }, [params])

  const dateKeys = useMemo(
    () =>
      dates !== undefined ? dates.map((day) => format(day!, 'yyyy-MM-dd')) : [],
    [dates],
  )

  const { data: tasks = [], isLoading: isTasksLoading } = useQuery<ITask[]>({
    queryKey: ['tasks', ...dateKeys],
    queryFn: async () => {
      const results = await Promise.all(dates.map((day) => getTask(day)))
      return results.flat()
    },
    enabled: dates.length > 0,
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
    isLoading: isTasksLoading || isCategoriesLoading,
  }
}
