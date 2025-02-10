'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'
import { endOfDay, startOfDay } from 'date-fns'
import { getKoreanTime } from '@/utils/formmattedDate'

export interface ITask {
  id: number
  content: string
  completed: boolean
  forToday: boolean | null
  categoryId: number | null
}

export const createTask = async (
  formData: FormData,
  date: Date,
  categoryId?: number,
) => {
  const content = formData.get('content') as string
  const kstTime = getKoreanTime(date)

  if (!content || content.trim() === '') {
    return
  }

  try {
    const user = await getUserInfo()

    await db.task.create({
      data: {
        content: content as string,
        userId: user?.id as string,
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
  const user = await getUserInfo()

  if (!user) return []

  const selectedDate = date || new Date()
  const startDate = getKoreanTime(startOfDay(selectedDate))
  const endDate = getKoreanTime(endOfDay(selectedDate))

  const tasks = await db.task.findMany({
    where: {
      userId: user?.id as string,
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
  const user = await getUserInfo()

  try {
    await db.task.update({
      where: { id, userId: user?.id },
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
  const user = await getUserInfo()

  try {
    await db.task.update({
      where: { id, userId: user?.id },
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
