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
  selectedDays: Date[]
  setWeek: (day: Date) => void
}

const WeekContext = createContext<WeekContextType | null>(null)

export const WeekProvider = ({ children }: { children: ReactNode }) => {
  const getWeekDays = (date: Date) =>
    eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) })

  const [selectedDays, setSelectedDays] = useState<Date[]>([])

  useEffect(() => {
    setSelectedDays(getWeekDays(new Date()))
  }, [])

  const setWeek = useCallback((day: Date) => {
    setSelectedDays(getWeekDays(day))
  }, [])

  return (
    <WeekContext.Provider value={{ selectedDays, setWeek }}>
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
