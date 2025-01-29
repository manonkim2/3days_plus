'use client'

import React, { useActionState, useState } from 'react'

import {
  createTask,
  deleteTask,
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
import { Input } from '@/components/ui'

const TaskInput = ({ tasks }: { tasks: ITask[] }) => {
  const [taskList, setTaskList] = useState<ITask[]>(tasks)
  const [editTask, setEditTask] = useState<{
    id: number
    content: string
  } | null>(null)

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

  const handleDeleteTask = async (id: number) => {
    const updatedTasks = await deleteTask(id)
    setTaskList(updatedTasks)
  }

  const handleToggleTask = async (id: number, completed: boolean) => {
    const updatedTask = await updateCheckTask(id, completed)
    if (updatedTask) {
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task,
        ),
      )
    }
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
      const updatedTask = await updateContentTask(editTask)
      if (updatedTask) {
        setTaskList((prev) =>
          prev.map((task) =>
            task.id === editTask.id
              ? { ...task, content: editTask.content }
              : task,
          ),
        )
      }
      setEditTask(null)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-y-scroll h-[300px]">
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
      </div>

      <FormActionWrapper
        formAction={formAction}
        placeholder="Add your task"
        isPending={isPending}
        button={<PlusIcon className="w-4 cursor-pointer" />}
      />
    </div>
  )
}

export default TaskInput
