'use client'

import { useMemo } from 'react'
import { Calendar } from '@/components/ui'
import { useRoutineWeekContext } from '../context'

const WeekSelectCalendar = () => {
  const { week, handleClickDate } = useRoutineWeekContext()

  const memoizedModifiers = useMemo(() => ({ selected: week }), [week])

  const memoizedModifiersStyles = useMemo(
    () => ({
      selected: { borderRadius: 0 },
    }),
    [],
  )

  return (
    <Calendar
      onDayClick={handleClickDate}
      modifiers={memoizedModifiers}
      modifiersStyles={memoizedModifiersStyles}
    />
  )
}

export default WeekSelectCalendar
