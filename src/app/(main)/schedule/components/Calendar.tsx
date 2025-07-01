'use client'

import { useMemo } from 'react'

import { useDateStore } from '@/stores/useDateStore'
import { Calendar as CalendarUI } from '@/components/ui/calendar'
import { eachDayOfInterval } from 'date-fns'

const Calendar = () => {
  const { date, week, setDate } = useDateStore()

  const memoizedModifiers = useMemo(() => {
    return {
      selectedDay: date ? [date] : [],
      selectedWeek:
        week && week.start && week.end
          ? eachDayOfInterval({ start: week.start, end: week.end })
          : [],
    }
  }, [date, week])

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
