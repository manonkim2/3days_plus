'use server'

import db from '@/lib/db'
import { endOfDay, startOfDay } from 'date-fns'
import { getKoreanTime } from '@/utils/formmattedDate'
import { getUserIdOrThrow } from '@/lib/auth'
import { ITask } from '@/types/schedule'

export const createTask = async (
  formData: FormData,
  date: Date,
  categoryId?: number,
) => {
  try {
    const userId = await getUserIdOrThrow()
    const content = formData.get('content') as string
    const kstTime = getKoreanTime(date)

    if (!content || content.trim() === '') return

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
  } catch (error) {
    console.error('[createTask Error]:', error)
  }
}

export const getTask = async (date?: Date): Promise<ITask[]> => {
  try {
    const userId = await getUserIdOrThrow()
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
  } catch (error) {
    console.error('[getTask Error]:', error)
    return []
  }
}

export const deleteTask = async (taskId: number) => {
  try {
    await getUserIdOrThrow()
    await db.task.delete({
      where: { id: taskId },
    })
  } catch (error) {
    console.error('[deleteTask Error]:', error)
  }
}

export const updateCheckTask = async (id: number, completed: boolean) => {
  try {
    const userId = await getUserIdOrThrow()
    return db.task.update({
      where: { id, userId },
      data: { completed: !completed },
    })
  } catch (error) {
    console.error('[updateCheckTask Error]:', error)
    return null
  }
}

export const updateContentTask = async (
  id: number,
  content: string,
  categoryId: number | undefined,
) => {
  try {
    const userId = await getUserIdOrThrow()
    await db.task.update({
      where: { id, userId },
      data: {
        content,
        categoryId,
      },
    })
  } catch (error) {
    console.error('[updateContentTask Error]:', error)
  }
}

export interface ICategory {
  id: number
  title: string
  color: string | null
}

export const createCategory = async (formData: FormData): Promise<void> => {
  try {
    const userId = await getUserIdOrThrow()
    const content = formData.get('content') as string

    if (!content || content.trim() === '') return

    await db.category.create({
      data: {
        title: content,
        userId,
      },
    })
  } catch (error) {
    console.error('[createCategory Error]:', error)
  }
}

export const getCategory = async (): Promise<ICategory[]> => {
  try {
    const userId = await getUserIdOrThrow()
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
  } catch (error) {
    console.error('[getCategory Error]:', error)
    return []
  }
}

export const deleteCategory = async (id: number) => {
  try {
    await getUserIdOrThrow()
    await db.category.delete({
      where: { id },
    })
  } catch (error) {
    console.error('[deleteCategory Error]:', error)
    throw new Error('Task deletion failed.')
  }
}
