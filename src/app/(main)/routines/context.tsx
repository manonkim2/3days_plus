'use client'

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface WeekContextType {
  week: Date[]
  day: Date
  handleClickDate: (day: Date) => void
}

const WeekContext = createContext<WeekContextType | null>(null)

export const WeekProvider = ({ children }: { children: ReactNode }) => {
  const [day, setDay] = useState<Date>(new Date())

  const getWeekDays = useCallback((date: Date) => {
    return eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) })
  }, [])

  const week = useMemo(() => getWeekDays(day), [day, getWeekDays])

  const handleClickDate = useCallback((selectedDay: Date) => {
    setDay(selectedDay)
  }, [])

  return (
    <WeekContext.Provider value={{ day, week, handleClickDate }}>
      {children}
    </WeekContext.Provider>
  )
}

export const useSelectedWeek = () => {
  const context = useContext(WeekContext)
  if (!context) {
    throw new Error('useSelectedWeek must be used within a WeekProvider')
  }
  return context
}
