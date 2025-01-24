'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export const createTask = async (
  prev: ITask[] | undefined,
  formData: FormData,
) => {
  const content = formData.get('content') as string

  if (!content || content.trim() === '') {
    return
  }

  try {
    const user = await getUserInfo()

    if (!user?.id) {
      alert('로그인을 진행해주세요')
      return
    }

    await db.task.create({
      data: {
        content: content as string,
        userId: user.id,
        forToday: true,
      },
      select: {
        id: true,
      },
    })

    return await getTask()
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Task creation failed.')
  }
}

export interface ITask {
  id: number
  content: string
  completed: boolean
  forToday: boolean | null
}

export const getTask = async (): Promise<ITask[]> => {
  const user = await getUserInfo()

  const tasks = await db.task.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      content: true,
      forToday: true,
      completed: true,
    },
  })

  return tasks
}

// export const updateTask = async (prev: void | null, formData: FormData) => {
//   const id = Number(formData.get('id'))
//   const completed = formData.get('completed')
//   const content = formData.get('content')

//   try {
//     await db.task.update({
//       where: { id },
//       data: { completed, content },
//     })
//   } catch (error) {
//     console.error('Error updating task:', error)
//     throw new Error('Task update failed.')
//   }
// }
