import Box from '@/components/Box'
import TaskList from '@/components/TaskList'
import TaskInput from './components/TaskInput'
import { getTask, ITask } from './actions'

const SchedulePage = async () => {
  const task: ITask[] = await getTask()

  return (
    <div>
      <div className="py-xxl grid grid-cols-2 gap-md">
        <Box>
          <div className="border h-[280px]">달력</div>
          <div>이달의 목표</div>
        </Box>

        <Box>
          <TaskList tasks={task} />
          <TaskInput />
        </Box>
      </div>

      <Box>
        <div className="h-[300px]">category별 할일리스트</div>
      </Box>
    </div>
  )
}

export default SchedulePage
