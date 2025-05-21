'use client'

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useMemo, useActionState } from 'react'
import {
  getRoutines,
  getRoutineLog,
  createRoutine,
  completeRoutine,
  unCompleteRoutine,
  deleteRoutine,
} from './actions'

export const useRoutineManager = (date: Date, week: Date[]) => {
  const queryClient = useQueryClient()
  const dateKey = format(date, 'yyyy-MM-dd')
  const weekKey = week.map((d) => format(d, 'yyyy-MM-dd'))

  const { data: routines = [] } = useQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })

  const { data: logs = [] } = useQuery({
    queryKey: ['routineLogs', ...weekKey],
    queryFn: () => getRoutineLog(undefined, week),
    enabled: week.length > 0,
  })

  const completedDay = useMemo(() => {
    return logs.reduce<Record<string, Set<number>>>((acc, log) => {
      const dateStr = format(new Date(log.date), 'yyyy-MM-dd')
      acc[dateStr] ||= new Set()
      acc[dateStr].add(log.routineId)
      return acc
    }, {})
  }, [logs])

  const logsMapByDateAndRoutine = useMemo(() => {
    const map = new Map<string, number>()
    logs.forEach((log) => {
      const key = `${format(new Date(log.date), 'yyyy-MM-dd')}-${log.routineId}`
      map.set(key, log.id)
    })
    return map
  }, [logs])

  const routinesWithLogId = useMemo(() => {
    return routines.map((routine) => ({
      ...routine,
      logId: logsMapByDateAndRoutine.get(`${dateKey}-${routine.id}`),
    }))
  }, [routines, logsMapByDateAndRoutine, dateKey])

  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      await createRoutine(formData)
      queryClient.invalidateQueries({ queryKey: ['routines'] })
    },
    null,
  )

  const handleClickComplete = async (id: number) => {
    await completeRoutine(id, date)
    queryClient.invalidateQueries({ queryKey: ['routineLogs', ...weekKey] })
  }

  const handleClickUndo = async (logId?: number) => {
    if (!logId) return
    await unCompleteRoutine(logId)
    queryClient.invalidateQueries({ queryKey: ['routineLogs', ...weekKey] })
  }

  const handleOnClickDelete = async (id: number) => {
    await deleteRoutine(id)
    queryClient.invalidateQueries({ queryKey: ['routines'] })
  }

  const completionPercents = useMemo(() => {
    const map: Record<number, number> = {}
    routines.forEach((routine) => {
      const completedCount = week.filter((day) => {
        const key = format(day, 'yyyy-MM-dd')
        return completedDay[key]?.has(routine.id)
      }).length
      map[routine.id] = (completedCount / 7) * 100
    })
    return map
  }, [routines, week, completedDay])

  return {
    routinesWithLogId,
    completedDay,
    handleClickComplete,
    handleClickUndo,
    handleOnClickDelete,
    formAction,
    isPending,
    completionPercents,
  }
}
