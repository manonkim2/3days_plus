'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

import React, { useState } from 'react'
import { createTask } from '../actions'

const TaskInput = () => {
  const [inputTask, setInputTask] = useState('')

  const handleOnChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    setInputTask(value)
  }

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await createTask(inputTask)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label className="input flex items-center gap-2">
        <input
          value={inputTask}
          onChange={handleOnChangeTask}
          type="text"
          placeholder="Add your task"
          className="input-ghost input-sm w-full max-w-xs"
        />
        <PlusIcon className="w-4 cursor-pointer" />
      </label>
    </form>
  )
}

export default TaskInput
