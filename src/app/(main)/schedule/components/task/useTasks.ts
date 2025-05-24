'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getCategory, getTask, ICategory } from './actions'
import { ITask } from '@/types/schedule'
import { useDateStore } from '@/stores/useDateStore'

/**
 * 날짜 배열을 받아 해당 날짜들에 해당하는 task들을 가져오는 훅
 * - store에서 date/week 가져옴
 * - mode: 'day' | 'week' 선택 가능
 */
export const useTasks = (mode: 'day' | 'week' = 'day') => {
  const { date, week } = useDateStore()

  const dates = useMemo(() => {
    return mode === 'day' ? [date] : week
  }, [date, mode, week])

  const dateKeys = useMemo(() => {
    return dates.map((day) => format(day, 'yyyy-MM-dd'))
  }, [dates])

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
