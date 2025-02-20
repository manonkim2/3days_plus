'use client'

import { createContext, useContext, useState } from 'react'

interface SelectedKeywordContextType {
  selectedKeyword: string
  setSelectedKeyword: (keyword: string) => void
}

export const DEFAULT_KEYWORD = '오늘의뉴스'

const SelectedKeywordContext = createContext<SelectedKeywordContextType | null>(
  null,
)

export const SelectedKeywordProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [selectedKeyword, setSelectedKeyword] = useState(DEFAULT_KEYWORD)

  return (
    <SelectedKeywordContext.Provider
      value={{ selectedKeyword, setSelectedKeyword }}
    >
      {children}
    </SelectedKeywordContext.Provider>
  )
}

export const useSelectedKeyword = () => {
  const context = useContext(SelectedKeywordContext)
  if (!context)
    throw new Error(
      'useSelectedKeyword must be used within a SelectedKeywordProvider',
    )
  return context
}
