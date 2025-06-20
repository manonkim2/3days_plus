'use client'

import { useMemo } from 'react'

import { useDateStore } from '@/stores/useDateStore'
import { Calendar as CalendarUI } from '@/components/ui/calendar'

const Calendar = () => {
  const { date, week, setDate } = useDateStore()

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
    <div className="flex justify-center">
      <CalendarUI
        onDayClick={setDate}
        modifiers={memoizedModifiers}
        modifiersStyles={memoizedModifiersStyles}
      />
    </div>
  )
}

export default Calendar
