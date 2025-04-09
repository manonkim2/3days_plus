'use client'

import { DateProvider } from '@/context/TaskContext'
import Box from '@/components/Box'
import Calendar from './components/Calendar'
import GoalManager from './components/goal/GoalManager'
import DayTaskChart from './components/task/DayTaskChart'
import TaskList from './components/task/TaskList'
import WeeklyTasksChart from './components/weekly-task/WeeklyTasksChart'
import WeeklyCategoryTasks from './components/weekly-task/WeeklyCategoryTasks'
import RoutineManager from './components/routine/RoutineManager'

const SchedulePage = () => {
  return (
    <DateProvider>
      <main className="grid grid-cols-[1fr_2.5fr_1fr] h-[calc(100vh-var(--navbar-height))] gap-md pb-12 container">
        <div className="flex flex-col justify-between">
          <Calendar />
          <GoalManager />
        </div>

        <div className="flex flex-col gap-md">
          <Box className="flex-1">
            <div className="grid grid-cols-[1fr_2fr]">
              <DayTaskChart />
              <TaskList />
            </div>
          </Box>
          <Box className="flex-1">
            <div className="flex gap-xl h-full">
              <WeeklyTasksChart />
              <WeeklyCategoryTasks />
            </div>
          </Box>
        </div>
        <RoutineManager />
      </main>
    </DateProvider>
  )
}

export default SchedulePage
