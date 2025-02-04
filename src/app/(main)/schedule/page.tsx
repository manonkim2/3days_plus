import Box from '@/components/Box'

import TaskList from './components/TaskList'
import CategoryList from './components/CategoryList'
import { getTask, ITask } from './taskActions'
import { getCategory, ICategory } from './categoryActions'
import { getKoreanTime } from '@/utils/useFormmattedDate'

const SchedulePage = async () => {
  const tasks: ITask[] = await getTask(getKoreanTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <div>
      <Box>
        <TaskList tasks={tasks} categories={categories} />
      </Box>

      <Box>
        <CategoryList categories={categories} />
      </Box>
    </div>
  )
}

export default SchedulePage
