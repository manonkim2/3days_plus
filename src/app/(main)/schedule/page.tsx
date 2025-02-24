import { WeekProvider } from './context'
import TaskList from './components/TaskList'
import TaskCategory from './components/TaskCategory'
import WeekSelectCalendar from './components/WeekSelectCalendar'
import RoutineManager from './components/RoutineManager'
import TodayChart from './components/TodayChart'
import { getCategory, ICategory } from './actions/categoryActions'
import { getTask, ITask } from './actions/taskActions'
import { getRoutines } from './actions/routineActions'
import { getKoreanTime } from '@/utils/formmattedDate'
import Box from '@/components/Box'

const SchedulePage = async () => {
  const routinesData = await getRoutines()
  const tasks: ITask[] = await getTask(getKoreanTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <WeekProvider>
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-xl">
        <aside>
          <Box className="flex flex-col gap-sm">
            <WeekSelectCalendar />
            <TodayChart />
          </Box>
        </aside>
        <div className="grid grid-cols-[1fr_4fr]">
          <TaskCategory categories={categories} />
          <TaskList tasks={tasks} categories={categories} />
        </div>
        <aside>
          <RoutineManager routinesData={routinesData} />
        </aside>
      </div>
    </WeekProvider>
  )
}

export default SchedulePage
