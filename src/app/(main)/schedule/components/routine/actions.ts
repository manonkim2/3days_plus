'use server'

import db from '@/lib/db'
import { endOfDay, startOfDay } from 'date-fns'
import { Prisma } from '@/prisma/client'
import { getKoreanTime } from '@/utils/formmattedDate'
import { getUserIdOrThrow } from '@/lib/auth'
import { IRoutine, IroutineLog } from '@/types/schedule'

export const createRoutine = async (
  formData: FormData,
): Promise<IRoutine | undefined> => {
  try {
    const userId = await getUserIdOrThrow()
    const routine = formData.get('content') as string | null
    if (!routine || routine.trim() === '') {
      return undefined
    }
    return db.routine.create({
      data: { name: routine, userId, color: 'black' },
      select: { id: true, name: true },
    })
  } catch (error) {
    console.error('[createRoutine Error]:', error)
    return undefined
  }
}

export const getRoutines = async (): Promise<IRoutine[]> => {
  try {
    const userId = await getUserIdOrThrow()
    return db.routine.findMany({
      where: { userId },
      select: { id: true, name: true },
      orderBy: { id: 'asc' },
    })
  } catch (error) {
    console.error('[getRoutines Error]:', error)
    return []
  }
}

export const getRoutineLog = async (
  day?: Date,
  week?: Date[],
): Promise<IroutineLog[]> => {
  try {
    const userId = await getUserIdOrThrow()
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
  } catch (error) {
    console.error('[getRoutineLog Error]:', error)
    return []
  }
}

export const deleteRoutine = async (id: number): Promise<void> => {
  try {
    await getUserIdOrThrow()
    await db.routine.delete({ where: { id } })
  } catch (error) {
    console.error('[deleteRoutine Error]:', error)
  }
}

export const completeRoutine = async (
  routineId: number,
  day: Date,
): Promise<{ id: number; routineId: number; date: Date } | null> => {
  try {
    const userId = await getUserIdOrThrow()
    const date = getKoreanTime(startOfDay(day))
    return db.routineLog.create({
      data: { userId, routineId, date },
      select: { id: true, routineId: true, date: true },
    })
  } catch (error) {
    console.error('[completeRoutine Error]:', error)
    return null
  }
}

export const unCompleteRoutine = async (
  routineLogId: number,
): Promise<void> => {
  try {
    await getUserIdOrThrow()
    await db.routineLog.delete({ where: { id: routineLogId } })
  } catch (error) {
    console.error('[unCompleteRoutine Error]:', error)
  }
}
