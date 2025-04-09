'use client'

import { useMemo } from 'react'
import { Calendar as CalendarUI } from '@/components/ui'
import { useTaskContext } from '@/context/TaskContext'

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
    <div className="flex w-auto justify-center">
      <CalendarUI
        onDayClick={handleClickDate}
        modifiers={memoizedModifiers}
        modifiersStyles={memoizedModifiersStyles}
      />
    </div>
  )
}

export default Calendar
