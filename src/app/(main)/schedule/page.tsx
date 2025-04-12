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
      <main className="grid grid-cols-[1fr_2.5fr_1fr] gap-md container h-screen pt-[var(--navbar-height)] pb-xl">
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
            <h2 className="text-xl font-semibold text-fontPrimary">
              This Week&apos;s Task Success Rate
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing completion rates for all tasks and selected category
            </p>
            <div className="flex gap-xl h-full items-center">
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
