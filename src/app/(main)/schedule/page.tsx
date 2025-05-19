import { Metadata } from 'next'
import { DateProvider } from '@/context/TaskContext'
import Box from '@/components/Box'
import Calendar from './components/Calendar'
import GoalManager from './components/goal/GoalManager'
import DayTaskChart from './components/task/DayTaskChart'
import TaskList from './components/task/TaskList'
import WeeklyTasksChart from './components/weekly-task/WeeklyTasksChart'
import WeeklyCategoryTasks from './components/weekly-task/WeeklyCategoryTasks'
import RoutineManager from './components/routine/RoutineManager'

export const metadata: Metadata = {
  title: '3Days+ | Daily Schedule & Routine',
  description:
    'Plan your daily schedule, manage routines, and track your tasks all in one place. Build consistent habits with 3Days+.',
}

const SchedulePage = async () => {
  return (
    <DateProvider>
      <h1 className="sr-only">
        3Days+ | 일정 & 할일 & 루틴 관리 (Daily Schedule & Tasks & Routine)
      </h1>
      <main className="grid grid-cols-[1fr_2.5fr_1fr] gap-md container h-screen pt-[var(--navbar-height)] pb-xxl mt-xl">
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
