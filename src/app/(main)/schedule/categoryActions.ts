'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'
import { redirect } from 'next/navigation'

export interface ICategory {
  id: number
  title: string
  color: string | null
}

export const createCategory = async (
  prev: ICategory[] | undefined,
  formData: FormData,
) => {
  const content = formData.get('content') as string

  if (!content || content.trim() === '') {
    return
  }

  const userId = await loginId()

  try {
    await db.category.create({
      data: {
        title: content as string,
        userId,
      },
    })

    return await getCategory()
  } catch (error) {
    console.error('Error creating category:', error)
  }
}

const loginId = async () => {
  const user = await getUserInfo()

  if (!user?.id) {
    return redirect('/login')
  }

  return user.id
}

export const getCategory = async (): Promise<ICategory[]> => {
  const userId = await loginId()

  const category = await db.category.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      color: true,
    },
  })

  return category
}
