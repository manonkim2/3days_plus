import { fetcher } from './fetcher'
import { RssNewsType } from '@/types/rss'

export const getRssNews = () =>
  fetcher<RssNewsType[]>('/api/rss', {
    fallbackErrorMessage: 'Failed to fetch RSS',
    showToastOnError: true,
  })
