'use server'

import { cache } from 'react'
import { unstable_cache as nextCache, revalidateTag } from 'next/cache'
import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export interface ICategory {
  id: number
  title: string
  color: string | null
}

const user = await getUserInfo()

export const createCategory = async (
  prev: ICategory[],
  formData: FormData,
): Promise<ICategory[]> => {
  const content = formData.get('content') as string

  if (!content || content.trim() === '') {
    return prev
  }

  try {
    await db.category.create({
      data: {
        title: content as string,
        userId: user?.id as string,
      },
    })

    revalidateTag('task_category')
    return await getCategory()
  } catch (error) {
    console.error('Error creating category:', error)
    return prev
  }
}

export const getCategory = nextCache(
  cache(async (): Promise<ICategory[]> => {
    const category = await db.category.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        title: true,
        color: true,
      },
    })

    return category
  }),
  ['task_category'],
  { tags: ['task_category'] },
)

export const deleteCategory = async (id: number) => {
  try {
    await db.category.delete({
      where: { id },
    })

    revalidateTag('task_category')
  } catch (error) {
    console.error('Error deleting task:', error)
    throw new Error('Task deletion failed.')
  }
}

export type ITaskInCategory = {
  id: number
  content: string
  completed: boolean
  date: Date
}

export const getTaskInCategory = nextCache(
  cache(async (id: number): Promise<ITaskInCategory[]> => {
    try {
      return await db.task.findMany({
        where: { categoryId: id },
        select: {
          id: true,
          content: true,
          completed: true,
          date: true,
        },
        orderBy: {
          date: 'asc',
        },
      })
    } catch (error) {
      console.error('Error get task:', error)
      return []
    }
  }),
  ['task_in_category'],
  { tags: ['task_in_category'] },
)
