'use server'

import db from '@/lib/db'
import { endOfDay, startOfDay } from 'date-fns'
import { getKoreanTime } from '@/utils/formmattedDate'
import { withUserInfo } from '@/lib/withUserInfo'
import { ITask } from '@/types/schedule'

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

  return withUserInfo(async (userId) => {
    return db.task.create({
      data: {
        content,
        userId,
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
  })
}

export const getTask = async (date?: Date): Promise<ITask[]> => {
  return withUserInfo(async (userId) => {
    const selectedDate = date || new Date()
    const startDate = getKoreanTime(startOfDay(selectedDate))
    const endDate = getKoreanTime(endOfDay(selectedDate))

    return db.task.findMany({
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
        completed: true,
        categoryId: true,
        date: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
  })
}

export const deleteTask = async (taskId: number) => {
  return withUserInfo(async () => {
    await db.task.delete({
      where: { id: taskId },
    })
  })
}

export const updateCheckTask = async (id: number, completed: boolean) => {
  return withUserInfo(async (userId) => {
    return db.task.update({
      where: { id, userId },
      data: { completed: !completed },
    })
  })
}

export const updateContentTask = async (
  id: number,
  content: string,
  categoryId: number | undefined,
) => {
  return withUserInfo(async (userId) => {
    await db.task.update({
      where: { id, userId },
      data: {
        content,
        categoryId,
      },
    })
  })
}

export interface ICategory {
  id: number
  title: string
  color: string | null
}

export const createCategory = async (formData: FormData): Promise<void> => {
  const content = formData.get('content') as string

  if (!content || content.trim() === '') {
    return
  }

  return withUserInfo(async (userId) => {
    try {
      await db.category.create({
        data: {
          title: content,
          userId,
        },
      })
    } catch (error) {
      console.error('Error creating category:', error)
    }
  })
}

export const getCategory = async (): Promise<ICategory[]> => {
  return withUserInfo(async (userId) => {
    return db.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        color: true,
      },
    })
  })
}

export const deleteCategory = async (id: number) => {
  return withUserInfo(async () => {
    try {
      await db.category.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      throw new Error('Task deletion failed.')
    }
  })
}
