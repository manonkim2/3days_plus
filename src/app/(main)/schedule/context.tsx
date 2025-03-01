'use client'

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface DateContextType {
  week: Date[]
  date: Date
  handleClickDate: (date: Date) => void
}

const WeekContext = createContext<DateContextType | null>(null)

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState(new Date())

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  return (
    <WeekContext.Provider value={{ date, week, handleClickDate }}>
      {children}
    </WeekContext.Provider>
  )
}

export const useDateContext = () => {
  const context = useContext(WeekContext)
  if (!context) {
    throw new Error('useDateContext must be used within a WeekProvider')
  }
  return context
}
