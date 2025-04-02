'use client'

import { createContext, useContext, useState } from 'react'

interface NewsContextType {
  selectedKeyword: string
  setSelectedKeyword: (keyword: string) => void
}

export const DEFAULT_KEYWORD = '오늘의뉴스'

const NewsContext = createContext<NewsContextType | null>(null)

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedKeyword, setSelectedKeyword] = useState(DEFAULT_KEYWORD)

  return (
    <NewsContext.Provider value={{ selectedKeyword, setSelectedKeyword }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNewsContext = () => {
  const context = useContext(NewsContext)
  if (!context)
    throw new Error('useSelectedKeyword must be used within a NewsProvider')
  return context
}
