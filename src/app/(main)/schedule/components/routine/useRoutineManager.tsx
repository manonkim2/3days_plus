'use client'

import { useQueryClient, useQuery } from '@tanstack/react-query'
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { useMemo, useActionState } from 'react'
import {
  getRoutines,
  getRoutineLog,
  createRoutine,
  completeRoutine,
  unCompleteRoutine,
  deleteRoutine,
} from './actions'
import { getDate } from '@/utils/formmattedDate'
import { useDateStore } from '@/stores/useDateStore'

export const useRoutineManager = () => {
  const queryClient = useQueryClient()
  const { date } = useDateStore()

  const dateKey = getDate(date)
  const weekdays = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
  })

  const { data: routines = [] } = useQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })

  const { data: logs = [], refetch } = useQuery({
    queryKey: ['routine-logs-week', getDate(weekdays[0])],
    queryFn: () => getRoutineLog(date, true),
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
    refetch()
  }

  const handleClickUndo = async (logId?: number) => {
    if (!logId) return
    await unCompleteRoutine(logId)
    refetch()
  }

  const handleOnClickDelete = async (id: number) => {
    await deleteRoutine(id)
    queryClient.invalidateQueries({ queryKey: ['routines'] })
  }

  const completionPercents = useMemo(() => {
    const map: Record<number, number> = {}
    routines.forEach((routine) => {
      const completedCount = weekdays.filter((day) => {
        const key = format(day, 'yyyy-MM-dd')
        return completedDay[key]?.has(routine.id)
      }).length
      map[routine.id] = (completedCount / 7) * 100
    })
    return map
  }, [routines, weekdays, completedDay])

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
