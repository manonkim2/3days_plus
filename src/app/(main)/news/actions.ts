'use server'

import { z } from 'zod'
import db from '@/lib/db'
import { withUserInfo } from '@/lib/withUserInfo'

const formSchema = z
  .string({ required_error: '키워드를 입력해주세요.' })
  .min(2, '키워드는 최소 2자 이상 입력해야 합니다.')
  .max(10, '키워드는 최대 10자까지 입력 가능합니다.')
  .regex(/^[가-힣a-zA-Z0-9]+$/, '특수문자는 사용할 수 없습니다.')
  .refine((value) => !/([ㄱ-ㅎㅏ-ㅣ])/.test(value), {
    message: '자음 또는 모음만 단독으로 입력할 수 없습니다.',
  })

export interface INewsKeyword {
  id: number
  keyword: string
}

export const createNewsKeyword = async (formData: FormData) => {
  const keyword = formData.get('content') as string | null
  const result = await formSchema.spa(keyword)

  if (!keyword || keyword.trim() === '') {
    return { errors: [] }
  }

  if (!result.success) {
    return { errors: result.error.flatten().formErrors }
  }

  try {
    const newKeyword = await withUserInfo(async (userId) => {
      return await db.newsKeyword.create({
        data: {
          keyword,
          userId,
        },
        select: {
          id: true,
          keyword: true,
        },
      })
    })

    return { newKeyword, errors: [] }
  } catch (error) {
    console.error(error)
    return { errors: ['An unexpected error occurred.'] }
  }
}

export const getNewsKeyword = async (): Promise<INewsKeyword[]> => {
  return await withUserInfo(async (userId) => {
    return await db.newsKeyword.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        keyword: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
  })
}

export const deleteNewsCategory = async (id: number) => {
  try {
    await db.newsKeyword.delete({
      where: { id },
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    throw new Error('Category deletion failed.')
  }
}
