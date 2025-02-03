'use server'

import { redirect } from 'next/navigation'
import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'
import { formatKstTime } from '@/utils/formatKstTime'
import { endOfDay, startOfDay } from 'date-fns'

export interface ITask {
  id: number
  content: string
  completed: boolean
  forToday: boolean | null
  categoryId: number | null
}

const loginId = async () => {
  const user = await getUserInfo()

  if (!user?.id) {
    return redirect('/login')
  }

  return user.id
}

export const createTask = async (
  prev: ITask[] | undefined,
  formData: FormData,
  date: Date,
  categoryId?: number,
) => {
  const content = formData.get('content') as string
  const kstTime = formatKstTime(date)

  if (!content || content.trim() === '') {
    return
  }

  try {
    const userId = await loginId()

    await db.task.create({
      data: {
        content: content as string,
        userId,
        forToday: true,
        date: kstTime,
        categoryId: categoryId || null,

        ...(categoryId
          ? {
              CategoryOnTask: {
                create: {
                  category: {
                    connect: { id: categoryId },
                  },
                },
              },
            }
          : {}),
      },
    })
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}

export const getTask = async (date?: Date): Promise<ITask[]> => {
  const userId = await loginId()

  const selectedDate = date || new Date()
  const startDate = formatKstTime(startOfDay(selectedDate))
  const endDate = formatKstTime(endOfDay(selectedDate))

  const tasks = await db.task.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      id: true,
      content: true,
      forToday: true,
      completed: true,
      categoryId: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  return tasks
}

export const deleteTask = async (taskId: number) => {
  try {
    await db.task.delete({
      where: { id: taskId },
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    throw new Error('Task deletion failed.')
  }
}

export const updateCheckTask = async (id: number, completed: boolean) => {
  const userId = await loginId()

  try {
    await db.task.update({
      where: { id, userId },
      data: {
        completed: !completed,
      },
    })
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}

export const updateContentTask = async (
  id: number,
  content: string,
  categoryId: number | undefined,
) => {
  const userId = await loginId()

  try {
    await db.task.update({
      where: { id, userId },
      data: {
        content,
        categoryId,
      },
    })
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}
