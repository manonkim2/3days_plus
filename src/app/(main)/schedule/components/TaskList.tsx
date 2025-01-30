'use client'

import React, { useActionState, useState } from 'react'

import {
  createTask,
  deleteTask,
  getTask,
  ITask,
  updateCheckTask,
  updateContentTask,
} from '../taskActions'
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Checkbox from '@/components/Checkbox'
import FormActionWrapper from '@/components/FormActionWrapper'
import { Calendar, Input } from '@/components/ui'
import Box from '@/components/Box'
import { formatKstTime } from '@/utils/formatKstTime'

const TaskInput = ({ tasks }: { tasks: ITask[] }) => {
  const [date, setDate] = useState<Date>(formatKstTime(new Date()))
  const [taskList, setTaskList] = useState<ITask[]>(tasks)
  const [editTask, setEditTask] = useState<{
    id: number
    content: string
  } | null>(null)

  const handleChangeDate = async (date: Date | undefined) => {
    if (date) {
      setDate(date)
    }

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const [, formAction, isPending] = useActionState(
    async (_: void, formData: FormData) => {
      await createTask(undefined, formData, date)

      const tasks = await getTask(date)
      setTaskList(tasks)
    },
    undefined,
  )

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id)

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    await updateCheckTask(id, completed)

    const tasks = await getTask(date)
    setTaskList(tasks)
  }

  const startEditingTask = (id: number, content: string) => {
    setEditTask({ id, content })
  }

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editTask) {
      setEditTask({ ...editTask, content: event.target.value })
    }
  }

  const handleSaveEdit = async () => {
    if (editTask) {
      await updateContentTask(editTask)

      const tasks = await getTask(date)
      setTaskList(tasks)

      setEditTask(null)
    }
  }

  return (
    <div className="flex">
      <Box>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => handleChangeDate(date)}
          className="rounded-md border shadow"
        />
      </Box>
      <Box>
        <div className="flex flex-col overflow-y-scroll h-[300px]">
          {taskList?.map(({ id, completed, content }) => (
            <div key={id} className="flex items-center w-full">
              {editTask?.id === id ? (
                <Input
                  type="text"
                  placeholder="Password"
                  value={editTask.content}
                  onChange={(event) => handleChangeTask(event)}
                  button={
                    <button
                      aria-label="edit Task"
                      type="submit"
                      onClick={handleSaveEdit}
                    >
                      <CheckIcon className="w-4 cursor-pointer" />
                    </button>
                  }
                />
              ) : (
                <div className="flex justify-between w-full">
                  <div onClick={() => handleToggleTask(id, completed)}>
                    <Checkbox checked={completed} text={content} />
                  </div>
                  <div className="flex items-center gap-sm">
                    <div
                      onClick={() => startEditingTask(id, content)}
                      className="cursor-pointer"
                    >
                      <PencilSquareIcon className="w-4" />
                    </div>
                    <div
                      onClick={() => handleDeleteTask(id)}
                      className="cursor-pointer"
                    >
                      <XMarkIcon className="w-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <FormActionWrapper
            formAction={formAction}
            placeholder="Add your task"
            isPending={isPending}
            button={<PlusIcon className="w-4 cursor-pointer" />}
          />
        </div>
      </Box>
    </div>
  )
}

export default TaskInput
