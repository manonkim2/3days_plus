'use client'

import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { IRoutine } from './routineActions'

interface WeekContextType {
  week: Date[]
  day: Date
  routines: IRoutine[]
  setRoutines: Dispatch<SetStateAction<IRoutine[]>>
  handleClickDate: (day: Date) => void
}

const WeekContext = createContext<WeekContextType | null>(null)

export const WeekProvider = ({ children }: { children: ReactNode }) => {
  const [day, setDay] = useState(new Date())
  const [routines, setRoutines] = useState<IRoutine[]>([])

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(day), end: endOfWeek(day) }),
    [day],
  )

  const handleClickDate = (selectedDay: Date) => setDay(selectedDay)

  return (
    <WeekContext.Provider
      value={{ day, week, handleClickDate, setRoutines, routines }}
    >
      {children}
    </WeekContext.Provider>
  )
}

export const useRoutineWeekContext = () => {
  const context = useContext(WeekContext)
  if (!context) {
    throw new Error('useRoutineWeekContext must be used within a WeekProvider')
  }
  return context
}
