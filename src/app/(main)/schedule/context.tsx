'use client'

import { createContext, useContext, useState, useMemo } from 'react'
import { ITask } from './actions/taskActions'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

interface TaskContextType {
  date: Date
  week: Date[]
  handleClickDate: (date: Date) => void

  tasks: ITask[]
  setTasks: (tasks: ITask[]) => void

  weekTasks: ITask[]

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

  // const refreshWeekTasks = useCallback(async () => {
  //   const tasksForWeek = await Promise.all(week.map((day) => getTask(day)))
  //   setWeekTasks(tasksForWeek.flat())
  // }, [week])

  // useEffect(() => {
  //   refreshWeekTasks()
  // }, [date, , refreshWeekTasks])

  return (
    <TaskContext.Provider
      value={{
        date,
        week,
        handleClickDate,
        tasks,
        setTasks,

        weekTasks,

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
