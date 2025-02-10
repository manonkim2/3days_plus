'use client'

import { Calendar } from '@/components/ui'
import { useSelectedWeek } from '../context'

const WeekSelectCalendar = () => {
  const { week, handleClickDate } = useSelectedWeek()

  return (
    <Calendar
      onDayClick={handleClickDate}
      modifiers={{ selected: week }}
      modifiersStyles={{
        selected: {
          borderRadius: 0,
        },
      }}
    />
  )
}

export default WeekSelectCalendar
