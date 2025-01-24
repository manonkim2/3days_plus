'use client'

import React, { useState } from 'react'
import { createTask, getTask, ITask } from '../actions'
import { PlusIcon } from '@heroicons/react/24/outline'
import Checkbox from '@/components/Checkbox'

const TaskInput = ({ tasks }: { tasks: ITask[] }) => {
  const [inputTask, setInputTask] = useState('')
  const [taskList, setTaskList] = useState<ITask[]>(tasks)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(event.target.value)
  }

  const handleOnSubmit = async () => {
    if (!inputTask.trim()) return

    await createTask(inputTask)

    const newTask = await getTask()
    setTaskList(newTask)
    setInputTask('')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnSubmit()
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="overflow-y-scroll h-[300px]">
        {taskList?.map((task) => (
          <Checkbox key={task.id} text={task.content} />
        ))}
      </div>

      <label className="input flex items-center gap-2">
        <input
          onChange={handleOnChange}
          onKeyDown={handleKeyPress}
          name="content"
          value={inputTask}
          type="text"
          placeholder="Add your task"
          className="input-ghost input-sm w-full max-w-xs"
        />
        <button onClick={handleOnSubmit} aria-label="Add Task">
          <PlusIcon className="w-4 cursor-pointer" />
        </button>
      </label>
    </div>
  )
}

export default TaskInput
