'use client'

import React, { useActionState } from 'react'

import { createTask, ITask } from '../actions'
import { PlusIcon } from '@heroicons/react/24/outline'
import Checkbox from '@/components/Checkbox'

const TaskInput = ({ tasks }: { tasks: ITask[] }) => {
  const [state, formAction, isPending] = useActionState(createTask, tasks)

  return (
    <div className="flex flex-col justify-between">
      <div className="overflow-y-scroll h-[300px]">
        {state?.map((task) => <Checkbox key={task.id} text={task.content} />)}
      </div>
      <form action={formAction}>
        <label className="input flex items-center gap-2">
          <input
            name="content"
            type="text"
            placeholder="Add your task"
            className="input-ghost input-sm w-full max-w-xs"
          />
          <button aria-label="Add Task" type="submit" disabled={isPending}>
            <PlusIcon className="w-4 cursor-pointer" />
          </button>
        </label>
      </form>
    </div>
  )
}

export default TaskInput
