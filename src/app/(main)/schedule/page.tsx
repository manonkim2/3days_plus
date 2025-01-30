import Box from '@/components/Box'

import TaskList from './components/TaskList'
import Category from './components/Category'
import { getTask, ITask } from './taskActions'
import { getCategory, ICategory } from './categoryActions'

const SchedulePage = async () => {
  const tasks: ITask[] = await getTask()
  const categories: ICategory[] = await getCategory()

  return (
    <div>
      <Box>
        <TaskList tasks={tasks} />
      </Box>

      <Box>
        <Category categories={categories} />
      </Box>
    </div>
  )
}

export default SchedulePage
