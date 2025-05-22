import { Metadata } from 'next'
import { DateProvider } from '@/context/ScheduleContext'
import Box from '@/components/Box'
import Calendar from './components/Calendar'
import GoalManager from './components/goal/GoalManager'
import RoutineManager from './components/routine/RoutineManager'
import TaskManager from './components/task/TaskManager'
import WeeklyTaskManager from './components/weekly-task/WeeklyTaskManager'

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

        <div className="grid grid-rows-2 gap-md">
          <Box>
            <TaskManager />
          </Box>
          <Box>
            <WeeklyTaskManager />
          </Box>
        </div>
        <RoutineManager />
      </main>
    </DateProvider>
  )
}

export default SchedulePage
