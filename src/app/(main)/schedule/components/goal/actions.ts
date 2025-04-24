'use server'

import db from '@/lib/db'
import { withUserInfo } from '@/lib/withUserInfo'
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
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const week = getISOWeek(date)

  return withUserInfo(async (userId) => {
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
  })
}

export const createGoalItem = async (
  type: GoalType,
  content: string,
  date: Date,
) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const week = getISOWeek(date)

  return withUserInfo(async (userId) => {
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
  })
}

export const toggleGoalItem = async (id: number, completed: boolean) => {
  return withUserInfo(async () => {
    return db.goal.update({
      where: { id },
      data: { completed },
    })
  })
}

// 목표 삭제
export const deleteGoalItem = async (id: number) => {
  return withUserInfo(async () => {
    return db.goal.delete({
      where: { id },
    })
  })
}
