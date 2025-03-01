'use server'

import { cache } from 'react'
import { unstable_cache as nextCache, revalidateTag } from 'next/cache'
import { endOfDay, startOfDay } from 'date-fns'
import db from '@/utils/db'
import { Prisma } from '../../../../../prisma/client'
import { getKoreanTime } from '@/utils/formmattedDate'
import { getUserInfo } from '@/utils/supabase/actions'

export interface IRoutine {
  id: number
  name: string
  color?: string
  logId?: number
}

const user = await getUserInfo()

export const createRoutine = async (
  formData: FormData,
): Promise<IRoutine | undefined> => {
  try {
    const routine = formData.get('content') as string | null

    if (!routine || routine.trim() === '') {
      return
    }

    await db.routine.create({
      data: {
        name: routine,
        userId: user?.id as string,
        color: 'black',
      },
      select: {
        id: true,
        name: true,
      },
    })

    revalidateTag('routines')
  } catch (error) {
    console.error('Error create routine', error)
  }
}

export const getRoutines = nextCache(
  cache(async (): Promise<IRoutine[]> => {
    const routines = await db.routine.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    return routines
  }),
  ['routines'],
  { tags: ['routines'] },
)

export const getRoutineLog = cache(
  async (
    day?: Date,
    week?: Date[],
  ): Promise<{ id: number; routineId: number; date: Date }[]> => {
    const whereCondition: Prisma.RoutineLogWhereInput = {
      userId: user?.id,
    }

    if (day) {
      whereCondition.date = getKoreanTime(startOfDay(day))
    } else if (week && week.length > 0) {
      whereCondition.date = {
        gte: getKoreanTime(startOfDay(week[0])), // 주의 첫날 (일요일)
        lt: getKoreanTime(endOfDay(week[6])), // 토요일까지
      }
    }
    const completedRoutine = await db.routineLog.findMany({
      where: whereCondition,
      select: {
        id: true,
        routineId: true,
        date: true,
      },
    })

    return completedRoutine
  },
)

export const deleteRoutine = async (id: number) => {
  try {
    await db.routine.delete({
      where: { id },
    })
  } catch (error) {
    console.error('Error deleting routine:', error)
    throw new Error('Routine deletion failed.')
  }
}

export const completeRoutine = async (routineId: number, day: Date) => {
  const date = getKoreanTime(startOfDay(day))

  try {
    const log = await db.routineLog.create({
      data: {
        userId: user?.id as string,
        routineId,
        date,
      },
      select: {
        id: true,
        routineId: true,
        date: true,
      },
    })

    return log
  } catch (error) {
    console.error('Error completing routine:', error)
    throw new Error('Failed to complete routine')
  }
}

export const unCompleteRoutine = async (routineId: number) => {
  try {
    await db.routineLog.delete({
      where: { id: routineId },
    })
  } catch (error) {
    console.error('Error deleting routine:', error)
    throw new Error('Failed to delete routine')
  }
}
