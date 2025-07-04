'use server'

import db from '@/lib/db'
import { Prisma } from '@/prisma/client'
import { getDateRangeInKST, getWeekRangeInKST } from '@/utils/formmattedDate'
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

/**
 *
 * @param date
 * @param isWeek default:flase / true = 일주일 치 routine log
 * @returns
 */
export const getRoutineLog = async (
  date: Date,
  isWeek: boolean = false,
): Promise<IroutineLog[]> => {
  try {
    const userId = await getUserIdOrThrow()
    const whereCondition: Prisma.RoutineLogWhereInput = { userId }

    const { startUtc } = getDateRangeInKST(date)
    const { startSunUtc, endSatUtc } = getWeekRangeInKST(date)
    if (isWeek)
      whereCondition.date = {
        gte: startSunUtc,
        lt: endSatUtc,
      }
    else {
      whereCondition.date = startUtc
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
  date: Date,
): Promise<{ id: number; routineId: number; date: Date } | null> => {
  try {
    const userId = await getUserIdOrThrow()
    const { startUtc } = getDateRangeInKST(date)

    return db.routineLog.create({
      data: { userId, routineId, date: startUtc },
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
