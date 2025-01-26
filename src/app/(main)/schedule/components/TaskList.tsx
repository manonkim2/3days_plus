'use client'

import React, { useActionState, useState } from 'react'

import {
  createTask,
  deleteTask,
  ITask,
  updateCheckTask,
  updateContentTask,
} from '../actions'
import {
  CheckIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Checkbox from '@/components/Checkbox'

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
      const updatedTask = await updateContentTask(editTask) // 서버와 통신하여 업데이트
      if (updatedTask) {
        setTaskList((prev) =>
          prev.map((task) =>
            task.id === editTask.id
              ? { ...task, content: editTask.content }
              : task,
          ),
        )
      }
      setEditTask(null) // 편집 모드 종료
    }
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-y-scroll h-[300px]">
        {taskList?.map(({ id, completed, content }) => (
          <div key={id} className="flex items-center w-full">
            <div onClick={() => handleToggleTask(id, completed)}>
              <Checkbox value={completed} />
            </div>

            {editTask?.id === id ? (
              <label className="input flex items-center w-full">
                <input
                  className="input-ghost input-xs w-full"
                  value={editTask.content}
                  onChange={(event) => handleChangeTask(event)}
                />
                <button
                  aria-label="edit Task"
                  type="submit"
                  onClick={handleSaveEdit}
                >
                  <CheckIcon className="w-4 cursor-pointer" />
                </button>
              </label>
            ) : (
              <div className="flex justify-between w-full">
                <p
                  className={`text-base ${
                    completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {content}
                </p>
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
