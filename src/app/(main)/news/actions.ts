'use server'

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
  lasBuildDate: string
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
