import Link from 'next/link'
import { cn } from '@/utils/cn'
import { ITask } from '@/types/schedule'
import { Button } from '@/components/shared'

const TasksDetail = ({ tasks }: { tasks: ITask[] }) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-md overflow-hidden h-full">
        <h2 className="text-xl text-fontTertiary">
          📝 Today&apos;s Tasks Completion
        </h2>
        <div className="flex flex-col gap-sm overflow-y-scroll h-full">
          {!tasks.length && (
            <div className="flex justify-center items-center text-fontSecondary border border-dashed rounded-md h-full text-base">
              Let&apos;s plan your day!
            </div>
          )}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <Button asChild className="w-full mt-md" variant="outline">
        <Link href="/schedule">Go to Task Schedule Page</Link>
      </Button>
    </div>
  )
}

const TaskCard = ({ task }: { task: ITask }) => {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-3 text-sm transition-shadow',
        task.completed
          ? 'bg-green-600/10 border-green-500'
          : 'bg-white/5 border-white/10',
      )}
    >
      <span className="flex items-center gap-2">
        <span>{task.completed ? '✅' : '⬜'}</span>
        <span className="text-fontTertiary">{task.content}</span>
      </span>
    </div>
  )
}

export default TasksDetail
