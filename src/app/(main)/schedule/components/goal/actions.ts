'use server'

import db from '@/lib/db'
import { getUserIdOrThrow } from '@/lib/auth'
import { GoalType } from '@/prisma/client'
import { getISOWeek } from 'date-fns'

export type GoalItem = {
  id: number
  content: string
  completed: boolean
}

export const getGoalItems = async (
  type: GoalType,
  date: Date,
): Promise<GoalItem[]> => {
  try {
    const userId = await getUserIdOrThrow()

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const week = getISOWeek(date)

    const items = await db.goal.findMany({
      where: {
        userId,
        type,
        year,
        ...(type !== 'YEAR' && { month }),
        ...(type === 'WEEK' && { week }),
      },
      orderBy: { createdAt: 'asc' },
    })

    return items.map((item) => ({
      id: item.id,
      content: item.content,
      completed: item.completed,
    }))
  } catch (error) {
    console.error('[getGoalItems Error]:', error)
    return []
  }
}

export const createGoalItem = async (
  type: GoalType,
  content: string,
  date: Date,
) => {
  try {
    const userId = await getUserIdOrThrow()

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const week = getISOWeek(date)

    return db.goal.create({
      data: {
        userId,
        type,
        content,
        year,
        month: type !== 'YEAR' ? month : null,
        week: type === 'WEEK' ? week : null,
      },
    })
  } catch (error) {
    console.error('[createGoalItem Error]:', error)
    return null
  }
}

export const toggleGoalItem = async (id: number, completed: boolean) => {
  try {
    await getUserIdOrThrow()
    return db.goal.update({
      where: { id },
      data: { completed },
    })
  } catch (error) {
    console.error('[toggleGoalItem Error]:', error)
    return null
  }
}

export const deleteGoalItem = async (id: number) => {
  try {
    await getUserIdOrThrow()
    return db.goal.delete({
      where: { id },
    })
  } catch (error) {
    console.error('[deleteGoalItem Error]:', error)
    return null
  }
}
