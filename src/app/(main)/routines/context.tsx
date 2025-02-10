'use client'

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface WeekContextType {
  week: Date[]
  day: Date
  handleClickDate: (day: Date) => void
}

const WeekContext = createContext<WeekContextType | null>(null)

export const WeekProvider = ({ children }: { children: ReactNode }) => {
  const getWeekDays = (date: Date) =>
    eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) })

  const [day, setDay] = useState<Date>(new Date())
  const [week, setWeek] = useState<Date[]>([])

  useEffect(() => {
    setWeek(getWeekDays(new Date()))
  }, [])

  const handleClickDate = useCallback((day: Date) => {
    setDay(day)
    setWeek(getWeekDays(day))
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
