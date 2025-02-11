'use server'

import db from '@/utils/db'
import { startOfDay } from 'date-fns'
import { getKoreanTime } from '@/utils/formmattedDate'
import { getUserInfo } from '@/utils/supabase/actions'

export interface IRoutine {
  id: number
  name: string
  color?: string
  complete?: boolean
  logId?: number
}

export const createRoutine = async (
  formData: FormData,
): Promise<IRoutine | undefined> => {
  const user = await getUserInfo()

  try {
    const routine = formData.get('content') as string | null

    if (!routine || routine.trim() === '') {
      return
    }

    const newRoutine = await db.routine.create({
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

    return newRoutine
  } catch (error) {
    console.error('Error create routine', error)
  }
}

export const getRoutines = async (): Promise<IRoutine[]> => {
  const user = await getUserInfo()

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
}

export const getRoutineLog = async (
  day: Date,
): Promise<{ id: number; routineId: number }[]> => {
  const user = await getUserInfo()
  const date = getKoreanTime(startOfDay(day))

  const completedRoutine = await db.routineLog.findMany({
    where: {
      userId: user?.id,
      date,
    },
    select: {
      id: true,
      routineId: true,
    },
  })

  return completedRoutine
}

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
  const user = await getUserInfo()
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
