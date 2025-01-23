'use client'

import React, { useActionState } from 'react'
import { createTask } from '../actions'
import { PlusIcon } from '@heroicons/react/24/outline'

const TaskInput = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useActionState(createTask, null)

  return (
    <form action={dispatch}>
      <label className="input flex items-center gap-2">
        <input
          name="content"
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
