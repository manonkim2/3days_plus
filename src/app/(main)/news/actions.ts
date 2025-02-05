'use server'

import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export interface INewsKeyword {
  id: number
  keyword: string
}

export const createNewsKeyword = async (
  prev: void | null,
  formData: FormData,
): Promise<INewsKeyword | undefined> => {
  const user = await getUserInfo()

  try {
    const keyword = formData.get('content') as string | null

    if (!keyword || keyword.trim() === '') {
      return
    }

    const newKeyword = await db.newsKeyword.create({
      data: {
        keyword,
        userId: user?.id as string,
      },
      select: {
        id: true,
        keyword: true,
      },
    })

    return newKeyword
  } catch (error) {
    console.error(error)
  }
}

export const getNewsKeyword = async (): Promise<INewsKeyword[]> => {
  const user = await getUserInfo()

  const keywords = await db.newsKeyword.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      keyword: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  return keywords
}
