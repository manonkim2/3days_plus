'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useSelectedKeyword } from '../context'
import { getNews, INaverNews } from '../actions'
import NewsCardSkeleton from './skeleton'
import { Pagination } from '@/components/Pagination'
import { getFormattedDate } from '@/utils/formmattedDate'
import { RefreshCcw } from 'lucide-react'

const NewsList = () => {
  const { selectedKeyword } = useSelectedKeyword()
  const [page, setPage] = useState(1)

  const {
    data: news,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['news', selectedKeyword, page],
    queryFn: () => getNews(selectedKeyword, page),
    enabled: !!selectedKeyword,
    staleTime: 60 * 60 * 1000, // 1시간
  })

  const removeHtmlTags = (str: string) =>
    str.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '')

  if (isLoading) return <NewsCardSkeleton />

  return (
    <div>
      {news && (
        <div className="flex justify-end pb-sm gap-sm">
          <span className="text-sm">
            last update : {getFormattedDate(news?.lastBuildDate)}
          </span>
          <div className="cursor-pointer" onClick={() => refetch()}>
            <RefreshCcw className="mr-2 h-4 w-4 shrink-0 opacity-70" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {news?.items.map((item, index) => (
          <NewsCard
            key={`${index} ${item.link}`}
            news={item}
            removeHtmlTags={removeHtmlTags}
          />
        ))}
      </div>

      {news && (
        <div className="flex w-full mt-8">
          <Pagination
            totalPages={20}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </div>
      )}
    </div>
  )
}

const NewsCard = ({
  news,
  removeHtmlTags,
}: {
  news: INaverNews['items'][number]
  removeHtmlTags: (str: string) => string
}) => {
  return (
    <Link
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border rounded-md p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
    >
      <div>
        <h3 className="text-md font-semibold text-gray-800">
          {removeHtmlTags(news.title)}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {getFormattedDate(news.pubDate)}
        </p>
        <p
          className="text-sm text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
      </div>
      <span className="text-blue-500 hover:underline text-xs">Read more</span>
    </Link>
  )
}

export default NewsList
