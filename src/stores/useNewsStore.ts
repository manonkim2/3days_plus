import { create } from 'zustand'

interface NewsState {
  selectedKeyword: string | null
  page: number
  setPage: (page: number) => void
  setSelectedKeyword: (keyword: string | null) => void
}

export const useNewsStore = create<NewsState>((set) => ({
  selectedKeyword: null,
  page: 1,
  setPage: (page) => set({ page }),
  setSelectedKeyword: (keyword) => set({ selectedKeyword: keyword, page: 1 }),
}))
