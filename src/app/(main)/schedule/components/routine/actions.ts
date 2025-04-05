'use server'

import { cache } from 'react'
import { endOfDay, startOfDay } from 'date-fns'
import db from '@/lib/db'
import { Prisma } from '../../../../../../prisma/client'
import { getKoreanTime } from '@/utils/formmattedDate'
import { withUserInfo } from '@/lib/withUserInfo'

export interface IRoutine {
  id: number
  name: string
  color?: string
  logId?: number
}

export const createRoutine = async (
  formData: FormData,
): Promise<IRoutine | undefined> => {
  return withUserInfo(async (userId) => {
    const routine = formData.get('content') as string | null
    if (!routine || routine.trim() === '') {
      return undefined
    }
    return db.routine.create({
      data: { name: routine, userId, color: 'black' },
      select: { id: true, name: true },
    })
  })
}

export const getRoutines = async (): Promise<IRoutine[]> => {
  return withUserInfo(async (userId) => {
    return db.routine.findMany({
      where: { userId },
      select: { id: true, name: true },
      orderBy: { id: 'asc' },
    })
  })
}

export const getRoutineLog = cache(
  async (
    day?: Date,
    week?: Date[],
  ): Promise<{ id: number; routineId: number; date: Date }[]> => {
    return withUserInfo(async (userId) => {
      const whereCondition: Prisma.RoutineLogWhereInput = { userId }
      if (day) {
        whereCondition.date = getKoreanTime(startOfDay(day))
      } else if (week && week.length > 0) {
        whereCondition.date = {
          gte: getKoreanTime(startOfDay(week[0])),
          lt: getKoreanTime(endOfDay(week[6])),
        }
      }
      return db.routineLog.findMany({
        where: whereCondition,
        select: { id: true, routineId: true, date: true },
      })
    })
  },
)

export const deleteRoutine = async (id: number): Promise<void> => {
  return withUserInfo(async () => {
    await db.routine.delete({ where: { id } })
  })
}

export const completeRoutine = async (
  routineId: number,
  day: Date,
): Promise<{ id: number; routineId: number; date: Date }> => {
  return withUserInfo(async (userId) => {
    const date = getKoreanTime(startOfDay(day))
    return db.routineLog.create({
      data: { userId, routineId, date },
      select: { id: true, routineId: true, date: true },
    })
  })
}

export const unCompleteRoutine = async (
  routineLogId: number,
): Promise<void> => {
  return withUserInfo(async () => {
    await db.routineLog.delete({ where: { id: routineLogId } })
  })
}
