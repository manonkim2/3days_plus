'use server'

import db from '@/lib/db'
import { withUserInfo } from '@/lib/withUserInfo'

export interface IQuotes {
  id: number
  content: string
  author: string | null
  isPublic: boolean
}

export interface IPinnedQuote {
  id: number
  quoteId: number
}

export const getQuotes = async (): Promise<IQuotes[]> => {
  return db.quote.findMany({
    where: {
      isPublic: true,
    },
    take: 10,
    select: {
      id: true,
      content: true,
      author: true,
      isPublic: true,
    },
  })
}

export const getPinnedQuote = async (): Promise<{ quoteId: number } | null> => {
  return await withUserInfo(async (userId) => {
    return await db.pinnedQuote.findUnique({
      where: {
        userId,
      },
      select: {
        quoteId: true,
      },
    })
  })
}

export const upsertPinnedQuote = async (
  quoteId: number,
): Promise<{ quoteId: number }> => {
  return withUserInfo(async (userId) => {
    const existing = await db.pinnedQuote.findUnique({
      where: { userId },
    })

    if (existing) {
      return db.pinnedQuote.update({
        where: { userId },
        data: { quoteId },
        select: { quoteId: true },
      })
    } else {
      return db.pinnedQuote.create({
        data: { userId, quoteId },
        select: { quoteId: true },
      })
    }
  })
}
