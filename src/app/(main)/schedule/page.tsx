import Box from '@/components/Box'

import TaskList from './components/TaskList'
import { getTask, ITask } from './taskActions'
import Category from './components/Category'
import { getCategory, ICategory } from './categoryActions'

const SchedulePage = async () => {
  const tasks: ITask[] = await getTask()
  const categories: ICategory[] = await getCategory()

  return (
    <div>
      <div className="py-xxl grid grid-cols-2 gap-md">
        <Box>
          <div className="border h-[280px]">달력</div>
          <div>month</div>
        </Box>

        <Box>
          <TaskList tasks={tasks} />
        </Box>
      </div>

      <Box>
        <Category categories={categories} />
      </Box>
    </div>
  )
}

export default SchedulePage
