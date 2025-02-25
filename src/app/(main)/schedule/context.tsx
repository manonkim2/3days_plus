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
import { IRoutine } from './actions/routineActions'

interface DateContextType {
  week: Date[]
  date: Date
  routines: IRoutine[]
  setRoutines: Dispatch<SetStateAction<IRoutine[]>>
  handleClickDate: (date: Date) => void
}

const WeekContext = createContext<DateContextType | null>(null)

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState(new Date())
  const [routines, setRoutines] = useState<IRoutine[]>([])

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  return (
    <WeekContext.Provider
      value={{ date, week, handleClickDate, setRoutines, routines }}
    >
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
