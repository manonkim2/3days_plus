'use client'

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import { getTask, ITask } from '../app/(main)/schedule/components/task/actions'

interface TaskContextType {
  date: Date
  week: Date[]
  handleClickDate: (date: Date) => void
  weekTaskList: ITask[]
  selectedCategoryId: number | null
  setSelectedCategoryId: (id: number | null) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState(new Date())
  const [weekTaskList, setWeekTaskList] = useState<ITask[]>([])

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  const refreshWeekTasks = useCallback(async () => {
    const tasksForWeek = await Promise.all(week.map((day) => getTask(day)))
    setWeekTaskList(tasksForWeek.flat())
  }, [week])

  useEffect(() => {
    refreshWeekTasks()
  }, [refreshWeekTasks])

  return (
    <TaskContext.Provider
      value={{
        date,
        week,
        handleClickDate,
        weekTaskList,
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a DateProvider')
  }
  return context
}
