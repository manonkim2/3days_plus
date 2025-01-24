'use client'

import React, { useActionState, useState } from 'react'

import { createTask, deleteTask, ITask } from '../actions'
import { PlusIcon } from '@heroicons/react/24/outline'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'

const TaskInput = ({ tasks }: { tasks: ITask[] }) => {
  const [taskList, setTaskList] = useState<ITask[]>(tasks)

  const [, formAction, isPending] = useActionState(
    async (prevTasks: ITask[] | undefined, formData: FormData) => {
      const updatedTasks = await createTask(prevTasks, formData)
      if (updatedTasks) {
        setTaskList(updatedTasks)
      }
      return updatedTasks
    },
    taskList,
  )

  const handleOnDelete = async (id: number) => {
    const updatedTasks = await deleteTask(id)
    setTaskList(updatedTasks)
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="overflow-y-scroll h-[300px]">
        {taskList?.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <Checkbox text={task.content} />
            <div onClick={() => handleOnDelete(task.id)}>
              <Button text="삭제" size="sm" variant="secondary" />
            </div>
          </div>
        ))}
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
