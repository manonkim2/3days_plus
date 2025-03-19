import { DateProvider } from './context'
import TaskList from './components/TaskList'
import Calendar from './components/Calendar'
import RoutineManager from './components/RoutineManager'
import WeeklyCategoryTasks from './components/WeeklyCategoryTasks'
import DayTaskChart from './components/DayTaskChart'
import WeeklyTasksChart from './components/WeeklyTasksChart'
import Box from '@/components/Box'
import { getCategory } from './actions/categoryActions'
import { getTask } from './actions/taskActions'
import { getRoutines } from './actions/routineActions'
import { getKoreanTime } from '@/utils/formmattedDate'

const fetchInitialData = async () => {
  const today = getKoreanTime(new Date())
  const [routineList, tasks, categories] = await Promise.all([
    getRoutines(),
    getTask(today),
    getCategory(),
  ])
  return { routineList, tasks, categories }
}

const SchedulePage = async () => {
  const { routineList, tasks, categories } = await fetchInitialData()

  return (
    <DateProvider>
      <main className="grid grid-cols-[1fr_3fr_1fr] h-[calc(100vh-var(--navbar-height))] gap-md pb-12">
        <Box className="flex flex-col gap-sm">
          <Calendar />
          <div>2025 목표 / 이 달의 목표 / 이 주의 목표</div>
        </Box>

        <div className="flex flex-col gap-md">
          <Box className="flex-1">
            <div className="grid grid-cols-[1fr_2fr]">
              <DayTaskChart />
              <TaskList tasks={tasks} categories={categories} />
            </div>
          </Box>
          <Box className="flex-1">
            <div className="flex gap-xl h-full">
              <WeeklyTasksChart />
              <WeeklyCategoryTasks categories={categories} />
            </div>
            {/* <RoutinesTable routinesData={routineList} /> */}
          </Box>
        </div>
        <RoutineManager routineList={routineList} />
      </main>
    </DateProvider>
  )
}

export default SchedulePage
