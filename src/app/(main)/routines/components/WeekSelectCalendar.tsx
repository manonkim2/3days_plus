'use client'

import { Calendar } from '@/components/ui'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import React, { useState, useEffect, useCallback } from 'react'

const getWeekDays = (date: Date) =>
  eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) })

const WeekSelectCalendar = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([])

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDays(getWeekDays(day))
  }, [])

  useEffect(() => {
    setSelectedDays(getWeekDays(new Date()))
  }, [])

  return (
    <Calendar
      onDayClick={handleDayClick}
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
