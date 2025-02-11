'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Check } from 'lucide-react'

import { useSelectedWeek } from '../context'
import { getRoutineLog, IRoutine } from '../actions'
import { getDateWithWeek } from '@/utils/formmattedDate'
import Box from '@/components/Box'

const RoutinesTable = ({ routinesData }: { routinesData: IRoutine[] }) => {
  const { week } = useSelectedWeek()

  const [completedLogs, setCompletedLogs] = useState<
    Record<string, Set<number>>
  >({})

  useEffect(() => {
    ;(async () => {
      const logs = await getRoutineLog(undefined, week)

      const logMap = logs.reduce<Record<string, Set<number>>>((acc, log) => {
        const dateKey = format(new Date(log.date), 'yyyy-MM-dd')
        acc[dateKey] = acc[dateKey] || new Set()
        acc[dateKey].add(log.routineId)
        return acc
      }, {})

      setCompletedLogs(logMap)
    })()
  }, [week, routinesData])

  return (
    <Box>
      <div className="flex flex-col gap-md">
        {/* 헤더 */}
        <div className="grid grid-cols-[1fr_repeat(7,minmax(0,1fr))] items-center gap-md border-b pb-md">
          <div className="font-semibold">Routine</div>
          {week.map((date, index) => (
            <div key={index} className="text-center font-semibold">
              {getDateWithWeek(date)}
            </div>
          ))}
        </div>

        {routinesData.map((routine) => (
          <div
            key={routine.id}
            className="grid grid-cols-[1fr_repeat(7,minmax(0,1fr))] items-center gap-md border-b pb-md "
          >
            <div>{routine.name}</div>
            {week.map((date, index) => (
              <div key={index} className="flex justify-center">
                {completedLogs[format(date, 'yyyy-MM-dd')]?.has(routine.id) && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Box>
  )
}

export default RoutinesTable
