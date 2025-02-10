'use client'

import { Calendar } from '@/components/ui'
import { useSelectedWeek } from '../context'

const WeekSelectCalendar = () => {
  const { selectedDays, setWeek } = useSelectedWeek()

  return (
    <Calendar
      onDayClick={setWeek}
      modifiers={{ selected: selectedDays }}
      modifiersStyles={{
        selected: {
          borderRadius: 0,
        },
      }}
    />
  )
}

export default WeekSelectCalendar
