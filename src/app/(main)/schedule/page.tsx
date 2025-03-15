import { DateProvider } from './context'
import TaskList from './components/TaskList'
import Calendar from './components/Calendar'
import RoutineManager from './components/RoutineManager'
import DayTaskChart from './components/DayTaskChart'
import RoutinesTable from './components/RoutinesTable'
import Box from '@/components/Box'
import { getCategory, ICategory } from './actions/categoryActions'
import { getTask, ITask } from './actions/taskActions'
import { getRoutines } from './actions/routineActions'
import { getKoreanTime } from '@/utils/formmattedDate'

const SchedulePage = async () => {
  const routineList = await getRoutines()
  const tasks: ITask[] = await getTask(getKoreanTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <DateProvider>
      <main className="grid grid-cols-[1fr_3fr_1fr] h-[calc(100vh-var(--navbar-height))] gap-md py-4">
        <Box className="flex flex-col gap-sm">
          <Calendar />
          <div>2025 목표 / 이 달의 목표 / 이 주의 목표</div>
        </Box>

        <div className="flex flex-col gap-md h-full">
          <Box>
            <div className="grid grid-cols-[1fr_2fr] h-[calc(50vh-var(--navbar-height))]">
              <DayTaskChart />
              <TaskList tasks={tasks} categories={categories} />
            </div>
          </Box>
          <Box className="flex-grow gap-sm">
            {/* <TaskCategory categories={categories} /> */}
            <RoutinesTable routinesData={routineList} />
          </Box>
        </div>
        <RoutineManager routineList={routineList} />
      </main>
    </DateProvider>
  )
}

export default SchedulePage
