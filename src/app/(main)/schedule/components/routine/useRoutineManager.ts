import { useQueryClient, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState, useEffect, useMemo, useActionState } from 'react'
import {
  getRoutines,
  getRoutineLog,
  createRoutine,
  completeRoutine,
  unCompleteRoutine,
  deleteRoutine,
} from '../../actions/routineActions'

export const useRoutineManager = (date: Date, week: Date[]) => {
  const queryClient = useQueryClient()

  const [completedDay, setCompletedDay] = useState<Record<string, Set<number>>>(
    {},
  )

  const { data: routines = [] } = useQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })

  const { data: logs = [] } = useQuery({
    queryKey: ['routineLogs', week],
    queryFn: () => getRoutineLog(undefined, week),
    enabled: !!week,
  })

  useEffect(() => {
    if (!logs) return

    const newLogMap = logs.reduce<Record<string, Set<number>>>((acc, log) => {
      const dateKey = format(new Date(log.date), 'yyyy-MM-dd')
      acc[dateKey] = acc[dateKey] || new Set()
      acc[dateKey].add(log.routineId)
      return acc
    }, {})

    const hasChanged = Object.keys(newLogMap).some((dateKey) => {
      const prevSet = completedDay[dateKey]
      const newSet = newLogMap[dateKey]
      if (!prevSet || prevSet.size !== newSet.size) return true
      for (const id of newSet) {
        if (!prevSet.has(id)) return true
      }
      return false
    })

    if (hasChanged) {
      setCompletedDay(newLogMap)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return routines.map((routine) => {
      const key = `${format(date, 'yyyy-MM-dd')}-${routine.id}`
      return {
        ...routine,
        logId: logsMapByDateAndRoutine.get(key),
      }
    })
  }, [routines, logsMapByDateAndRoutine, date])

  const updateCompletionState = (id: number, isCompleted: boolean) => {
    setCompletedDay((prev) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      const updatedSet = new Set(prev[dateKey] || [])

      if (isCompleted) {
        updatedSet.add(id)
      } else {
        updatedSet.delete(id)
      }

      return { ...prev, [dateKey]: updatedSet }
    })
  }

  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const newRoutine = await createRoutine(formData)
      if (newRoutine) {
        queryClient.invalidateQueries({ queryKey: ['routines'] })
      }
    },
    null,
  )

  const handleClickComplete = async (id: number) => {
    const completedLog = await completeRoutine(id, date)
    if (completedLog) {
      updateCompletionState(id, true)
      queryClient.invalidateQueries({ queryKey: ['routineLogs'] })
    }
  }

  const handleClickUndo = async (id: number | undefined) => {
    if (!id) return
    updateCompletionState(id, false)
    await unCompleteRoutine(id)
    queryClient.invalidateQueries({ queryKey: ['routineLogs'] })
  }

  const handleOnClickDelete = async (id: number) => {
    if (!id) return
    await deleteRoutine(id)
    queryClient.invalidateQueries({ queryKey: ['routines'] })
  }

  const completionPercents = useMemo(() => {
    const map: Record<number, number> = {}
    routines.forEach((routine) => {
      const completedCount = week.filter((day) => {
        const dateKey = format(day, 'yyyy-MM-dd')
        return completedDay[dateKey]?.has(routine.id)
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
