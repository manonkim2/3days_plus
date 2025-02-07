import TaskList from './components/TaskList'
import CategoryList from './components/CategoryList'
import { getTask, ITask } from './taskActions'
import { getCategory, ICategory } from './categoryActions'
import { getKoreanTime } from '@/utils/formmattedDate'

const SchedulePage = async () => {
  const tasks: ITask[] = await getTask(getKoreanTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <div>
      <TaskList tasks={tasks} categories={categories} />
      <CategoryList categories={categories} />
    </div>
  )
}

export default SchedulePage
