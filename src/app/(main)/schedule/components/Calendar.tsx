'use client'

import { useMemo } from 'react'
import { Calendar as CalendarUI } from '@/components/ui'
import { useTaskContext } from '../context'

const Calendar = () => {
  const { date, week, handleClickDate } = useTaskContext()

  const memoizedModifiers = useMemo(
    () => ({
      selectedDay: date ? [date] : [],
      selectedWeek: week || [],
    }),
    [date, week],
  )

  const memoizedModifiersStyles = useMemo(
    () => ({
      selectedDay: { backgroundColor: 'black', color: 'white' },
      selectedWeek: { border: '1px solid black' },
    }),
    [],
  )

  return (
    <CalendarUI
      onDayClick={handleClickDate}
      modifiers={memoizedModifiers}
      modifiersStyles={memoizedModifiersStyles}
    />
  )
}

export default Calendar
