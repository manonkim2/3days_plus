'use client'

import { GoalType } from '@/prisma/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  createGoalItem,
  deleteGoalItem,
  getGoalItems,
  GoalItem,
  toggleGoalItem,
} from './actions'
import { useDateStore } from '@/stores/useDateStore'
import { getWeekKey } from '@/utils/formmattedDate'

export const useGoalItems = (type: GoalType) => {
  const queryClient = useQueryClient()
  const { date } = useDateStore()

  const getDateKey = () => {
    if (type === 'WEEK') {
      return getWeekKey(date)
    }
    if (type === 'MONTH') {
      return format(date, 'yyyy-MM')
    }
    if (type === 'YEAR') {
      return format(date, 'yyyy')
    }
  }

  const queryKey = ['goalItems', type, getDateKey()]

  const { data = [], isLoading } = useQuery<GoalItem[]>({
    queryKey,
    queryFn: () => getGoalItems(type, date),
  })

  const addGoal = useMutation({
    mutationFn: (content: string) => createGoalItem(type, content, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const toggleGoal = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleGoalItem(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const deleteGoal = useMutation({
    mutationFn: (id: number) => deleteGoalItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return {
    goalItems: data,
    isLoading,
    addGoal,
    toggleGoal,
    deleteGoal,
  }
}
