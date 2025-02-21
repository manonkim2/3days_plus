'use server'

import { z } from 'zod'
import db from '@/utils/db'
import { getUserInfo } from '@/utils/supabase/actions'

export interface INaverNews {
  display: number
  items: {
    title: string
    originallink: string
    link: string
    description: string
    pubDate: string
  }[]
  lastBuildDate: string
  start: number
  total: number
}

const client_id = process.env.NEXT_PUBLIC_NAVER_NEWS_CLIENT_ID!
const client_secret = process.env.NEXT_PUBLIC_NAVER_NEWS_CLIENT_SECRET!

export const getNews = async (
  keyword: string,
  page: number,
): Promise<INaverNews | undefined> => {
  try {
    const display = 12
    const start = (page - 1) * display + 1
    const query = encodeURIComponent(keyword)
    const url = `https://openapi.naver.com/v1/search/news?query=${query}&start=${start}&display=${display}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching news:', error)
  }
}

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
  const user = await getUserInfo()

  const keyword = formData.get('content') as string | null
  const result = await formSchema.spa(keyword)

  if (!result.success) {
    return { errors: result.error.flatten().formErrors }
  }

  try {
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

    return { newKeyword, errors: [] }
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
