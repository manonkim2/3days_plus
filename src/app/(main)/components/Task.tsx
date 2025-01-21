'use client'

import Link from 'next/link'

import Box from '@/components/Box'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import { useState } from 'react'

const MOCK_TASKS = [
  {
    id: 1,
    description: 'Description 1',
    finished: false,
  },
  {
    id: 2,
    description: 'Description 2',
    finished: false,
  },
  {
    id: 3,
    description: 'Description 3',
    finished: false,
  },
]

const Task = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS)

  const onClickAddTask = () => {
    const newTasks = {
      id: tasks.length + 1,
      description: 'new task',
      finished: false,
    }

    setTasks([...tasks, newTasks])
  }

  return (
    <Box>
      <div className="flex justify-between items-center">
        <span className="text-xl">TASK</span>
        <Link href={'/schedule'}>
          <Button text="바로가기" size="sm" variant="secondary" />
        </Link>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="mt-sm h-[80%] overflow-y-auto">
          {tasks.map((task) => (
            <Checkbox key={task.id} text={task.description} />
          ))}
        </div>

        <Button
          text="+ add"
          variant="tertiary"
          size="sm"
          onClick={onClickAddTask}
        />
      </div>
    </Box>
  )
}

export default Task
