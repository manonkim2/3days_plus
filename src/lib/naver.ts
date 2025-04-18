import { INaverNews } from '@/app/api/naver/news/route'
import { fetcher } from './fetcher'

export const getNews = (query: string, page: number) =>
  fetcher<INaverNews>('/api/naver/news', {
    query: { query, page },
    fallbackErrorMessage: '뉴스 로딩 실패',
    showToastOnError: true,
  })
