'use client'

import { Calendar } from '@/components/ui'
import { useSelectedWeek } from '../context'
import { useMemo } from 'react'

const WeekSelectCalendar = () => {
  const { week, handleClickDate } = useSelectedWeek()

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
