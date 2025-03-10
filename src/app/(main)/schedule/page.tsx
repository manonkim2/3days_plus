import { DateProvider } from './context'
import TaskList from './components/TaskList'
import Calendar from './components/Calendar'
import RoutineManager from './components/RoutineManager'
import TodayChart from './components/TodayChart'
import { getCategory, ICategory } from './actions/categoryActions'
import { getTask, ITask } from './actions/taskActions'
import { getRoutines } from './actions/routineActions'
import { getKoreanTime } from '@/utils/formmattedDate'
import Box from '@/components/Box'
import TaskCategory from './components/TaskCategory'

const SchedulePage = async () => {
  const routineList = await getRoutines()
  const tasks: ITask[] = await getTask(getKoreanTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <DateProvider>
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-xl">
        <aside>
          <Box className="flex flex-col gap-sm">
            <Calendar />
            <TodayChart />
          </Box>
        </aside>
        <div className="grid grid-cols-[1fr_2fr]">
          <TaskCategory categories={categories} />
          <TaskList tasks={tasks} categories={categories} />
        </div>
        <aside>
          <RoutineManager routineList={routineList} />
        </aside>
      </div>
    </DateProvider>
  )
}

export default SchedulePage
