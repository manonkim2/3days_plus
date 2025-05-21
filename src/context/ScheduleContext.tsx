'use client'

import { createContext, useContext, useState, useMemo } from 'react'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

interface ScheduleContextType {
  date: Date
  week: Date[]
  handleClickDate: (date: Date) => void
  selectedCategoryId: number | null
  setSelectedCategoryId: (id: number | null) => void
}

const ScheduleContext = createContext<ScheduleContextType | null>(null)

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState(new Date())
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  return (
    <ScheduleContext.Provider
      value={{
        date,
        week,
        handleClickDate,
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext)
  if (!context) {
    throw new Error('useScheduleContext must be used within a DateProvider')
  }
  return context
}
