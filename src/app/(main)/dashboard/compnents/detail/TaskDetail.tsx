'use client'

import { useRouter } from 'next/navigation'
import { ITask } from '@/types/schedule'
import { Button } from '@/components/shared'

const TaskDetail = ({ tasks }: { tasks: ITask[] }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 overflow-y-scroll gap-sm h-full">
        {!tasks.length && (
          <div className="flex justify-center items-center text-fontTertiary border border-dashed rounded-md text-base mb-sm">
            Let&apos;s plan your day!
          </div>
        )}
        {tasks.map((task) => (
          <div key={task.id} className="flex gap-sm pb-xs text-base">
            <span>{task.completed ? '✅' : '⬜'}</span>
            <span className="text-fontTertiary">{task.content}</span>
          </div>
        ))}
      </div>

      <Button onClick={() => router.push('/schedule')}>
        Go to Schedule Page
      </Button>
    </div>
  )
}

export default TaskDetail
