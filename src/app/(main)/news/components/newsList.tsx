'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useSelectedKeyword } from '../context'
import { getNews, INaverNews } from '../actions'
import { Pagination } from '@/components/Pagination'
import NewsCardSkeleton from './skeleton'

const NewsList = () => {
  const { selectedKeyword } = useSelectedKeyword()
  const [page, setPage] = useState(1)

  const { data: news, isLoading } = useQuery({
    queryKey: ['news', selectedKeyword, page],
    queryFn: () => getNews(selectedKeyword, page),
    enabled: !!selectedKeyword,
  })

  const removeHtmlTags = (str: string) =>
    str.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"')

  if (isLoading) return <NewsCardSkeleton />

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="bg-white border rounded-md p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer">
      <Link href={news.link} target="_blank" rel="noopener noreferrer">
        <h3 className="text-md font-semibold text-gray-800">
          {removeHtmlTags(news.title)}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(news.pubDate).toLocaleDateString()}
        </p>
        <p
          className="text-sm text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        <span className="text-blue-500 hover:underline text-sm">Read more</span>
      </Link>
    </div>
  )
}

export default NewsList
