'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
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
}

const TaskContext = createContext<TaskContextType | null>(null)

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState<ITask[]>([])
  const [weekTasks, setWeekTasks] = useState<ITask[]>([])

  const week = useMemo(
    () => eachDayOfInterval({ start: startOfWeek(date), end: endOfWeek(date) }),
    [date],
  )

  const handleClickDate = (selectedDay: Date) => setDate(selectedDay)

  const refreshTasks = async () => {
    const updatedTasks = await getTask(date)
    setTasks(updatedTasks)
  }

  const refreshWeekTasks = async () => {
    const tasksForWeek = await Promise.all(week.map((day) => getTask(day)))
    setWeekTasks(tasksForWeek.flat())
  }

  useEffect(() => {
    refreshTasks()
    refreshWeekTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

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
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
