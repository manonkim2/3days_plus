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

export const useGoalItems = (type: GoalType, date: Date) => {
  const queryClient = useQueryClient()

  const queryKey = ['goalItems', type, format(date, 'yyyy-MM-dd')]

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
