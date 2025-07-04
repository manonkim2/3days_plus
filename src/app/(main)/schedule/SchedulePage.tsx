import { Metadata } from 'next'
import Calendar from './components/Calendar'
import GoalManager from './components/goal/GoalManager'
import RoutineManager from './components/routine/RoutineManager'
import TaskManager from './components/task/TaskManager'
import WeeklyTaskManager from './components/weekly-task/WeeklyTaskManager'
import { Footer } from '@/components/shared'

export const metadata: Metadata = {
  title: '3Days+ | Daily Schedule & Routine',
  description:
    'Plan your daily schedule, manage routines, and track your tasks all in one place. Build consistent habits with 3Days+.',
}

const SchedulePage = async () => {
  return (
    <div>
      <div className="container flex flex-col md:h-screen h-full pt-[calc(var(--navbar-height)+24px)] px-lg sm:px-0">
        <h1 className="sr-only">
          3Days+ | 일정 & 할일 & 루틴 관리 (Daily Schedule & Tasks & Routine)
        </h1>
        <div className="h-full grid md:grid-cols-[1.1fr_1.2fr_1fr] lg:grid-cols-[1.1fr_2.5fr_1fr] gap-md grid-cols-1 pb-md ">
          <div className="flex flex-col sm:flex-row md:flex-col h-full overflow-hidden gap-md min-h-[240px]">
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
      <Footer />
    </div>
  )
}

export default SchedulePage
