import { Metadata } from 'next'
import { DateProvider } from '@/context/ScheduleContext'
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
      <div className="flex container h-screen pt-[calc(var(--navbar-height)+24px)] pb-md">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr] lg:grid-cols-[1.1fr_2.5fr_1fr] gap-md">
          <div className="flex flex-col h-full overflow-hidden">
            <Calendar />
            <GoalManager />
          </div>

          <div className="flex flex-col h-full gap-md">
            <TaskManager />
            <WeeklyTaskManager />
          </div>
          <RoutineManager />
        </div>
      </div>
    </DateProvider>
  )
}

export default SchedulePage
