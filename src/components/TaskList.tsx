import { ITask } from '@/app/(main)/schedule/actions'
import Checkbox from './Checkbox'

const TaskList = async ({ tasks }: { tasks: ITask[] }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="mt-sm  overflow-y-auto">
          {tasks?.map((task) => <Checkbox key={task.id} text={task.content} />)}
        </div>
      </div>
    </>
  )
}

export default TaskList
