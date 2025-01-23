'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export const createTask = async (task: string) => {
  try {
    const user = await getUserInfo()

    if (!user?.id) {
      alert('로그인을 진행해주세요')
      return
    }

    await db.task.create({
      data: {
        content: task,
        userId: user.id,
        forToday: true,
      },
      select: {
        id: true,
      },
    })
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}
