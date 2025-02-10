'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export interface IRoutine {
  id: number
  name: string
  color?: string
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
