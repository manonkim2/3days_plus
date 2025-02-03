import Box from '@/components/Box'

import TaskList from './components/TaskList'
import Category from './components/Category'
import { getTask, ITask } from './taskActions'
import { getCategory, ICategory } from './categoryActions'
import { formatKstTime } from '@/utils/formatKstTime'

const SchedulePage = async () => {
  const tasks: ITask[] = await getTask(formatKstTime(new Date()))
  const categories: ICategory[] = await getCategory()

  return (
    <div>
      <Box>
        <TaskList tasks={tasks} categories={categories} />
      </Box>

      <Box>
        <Category categories={categories} />
      </Box>
    </div>
  )
}

export default SchedulePage
