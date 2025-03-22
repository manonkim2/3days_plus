'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { getTask, ITask } from './actions/taskActions'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

interface TaskContextType {
  date: Date
  week: Date[]
  handleClickDate: (date: Date) => void

  tasks: ITask[]
  setTasks: (tasks: ITask[]) => void
  refreshTasks: () => Promise<void>

  weekTasks: ITask[]
  refreshWeekTasks: () => Promise<void>

  selectedCategoryId: number | null
  setSelectedCategoryId: (id: number | null) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState<ITask[]>([])
  const [weekTasks, setWeekTasks] = useState<ITask[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  const refreshTasks = useCallback(async () => {
    const updatedTasks = await getTask(date)
    setTasks(updatedTasks)
  }, [date])

  const refreshWeekTasks = useCallback(async () => {
    const tasksForWeek = await Promise.all(week.map((day) => getTask(day)))
    setWeekTasks(tasksForWeek.flat())
  }, [week])

  useEffect(() => {
    refreshTasks()
    refreshWeekTasks()
  }, [date, refreshTasks, refreshWeekTasks])

  return (
    <TaskContext.Provider
      value={{
        date,
        week,
        handleClickDate,
        tasks,
        setTasks,
        refreshTasks,
        weekTasks,
        refreshWeekTasks,
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
