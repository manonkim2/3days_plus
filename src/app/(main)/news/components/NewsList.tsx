'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { RefreshCcw } from 'lucide-react'

import NewsCardSkeleton from './NewsSkeleton'
import { Pagination } from '@/components/Pagination'
import { getFormattedDate } from '@/utils/formmattedDate'
import { useNewsContext } from '@/context/NewsContext'
import { getNews } from '@/lib/getNews'
import { INaverNews } from '@/app/api/naver/news/route'

const NewsList = () => {
  const { selectedKeyword, page, setPage } = useNewsContext()

  const {
    data: news,
    isLoading,
    refetch,
  } = useQuery<INaverNews>({
    queryKey: ['news', selectedKeyword, page],
    queryFn: () => getNews(selectedKeyword, page),
    enabled: !!selectedKeyword,
    staleTime: 60 * 60 * 1000, // 1시간
  })

  const removeHtmlTags = (str: string) =>
    str.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '')

  if (isLoading) return <NewsCardSkeleton />

  return (
    <div className="container">
      {!news?.total ? (
        <div className="text-center text-gray-500 text-sm py-8">
          No news found for this keyword.
          <br />
          Try exploring other topics!
        </div>
      ) : (
        <div className="flex justify-end items-center pb-sm gap-sm">
          <span className="text-sm text-gray-400">
            last update : {getFormattedDate(news?.lastBuildDate)}
          </span>
          <RefreshCcw
            className="mr-2 h-4 w-4 shrink-0 opacity-70 cursor-pointer"
            onClick={() => refetch()}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {news?.items.map((item) => (
          <NewsCard
            key={item.link}
            news={item}
            removeHtmlTags={removeHtmlTags}
          />
        ))}
      </div>

      {news && (
        <div className="flex w-full my-16">
          <Pagination
            totalPages={news.total}
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
      className="flex flex-col justify-between bg-white border rounded-md p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer min-h-[200px]"
    >
      <div>
        <h3 className="text-md font-semibold text-gray-800">
          {removeHtmlTags(news.title)}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {getFormattedDate(news.pubDate)}
        </p>
        <p
          className="text-sm text-gray-700 mb-md"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
      </div>
      <span className="text-blue-500 hover:underline text-xs">Read more</span>
    </Link>
  )
}

export default NewsList
