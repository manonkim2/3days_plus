import { useQuery } from '@tanstack/react-query'
import { NewsCardItem } from '@/types/rss'

export const useDashboardNews = () => {
  return useQuery<NewsCardItem[]>({
    queryKey: ['dashboardNews'],
    queryFn: async () => {
      const res = await fetch('/api/news')
      if (!res.ok) throw new Error('Failed to fetch news')
      return res.json()
    },
  })
}
