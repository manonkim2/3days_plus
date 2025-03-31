'use client'

import { DateProvider } from './context'
import Box from '@/components/Box'
import Calendar from './components/Calendar'
import DayTaskChart from './components/task/DayTaskChart'
import TaskList from './components/task/TaskList'
import WeeklyTasksChart from './components/weekly-task/WeeklyTasksChart'
import WeeklyCategoryTasks from './components/weekly-task/WeeklyCategoryTasks'
import RoutineManager from './components/routine/RoutineManager'

const SchedulePage = () => {
  return (
    <DateProvider>
      <main className="grid grid-cols-[1fr_3fr_1fr] h-[calc(100vh-var(--navbar-height))] gap-md pb-12 container">
        <Box className="flex flex-col gap-sm">
          <Calendar />
          <div>2025 목표 / 이 달의 목표 / 이 주의 목표</div>
        </Box>

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
