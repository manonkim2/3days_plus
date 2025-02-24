'use client'

import { useMemo } from 'react'
import { Calendar } from '@/components/ui'
import { useRoutineWeekContext } from '../context'

const WeekSelectCalendar = () => {
  const { day, week, handleClickDate } = useRoutineWeekContext()

  const memoizedModifiers = useMemo(
    () => ({
      selectedDay: day ? [day] : [],
      selectedWeek: week || [],
    }),
    [day, week],
  )

  const memoizedModifiersStyles = useMemo(
    () => ({
      selectedDay: { backgroundColor: 'black', color: 'white' },
      selectedWeek: { border: '1px solid black' },
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
