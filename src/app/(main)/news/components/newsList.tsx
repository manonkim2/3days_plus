'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { useSelectedKeyword } from '../context'
import { getNews } from '../actions'

const NewsList = () => {
  const { selectedKeyword } = useSelectedKeyword()

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news', selectedKeyword],
    queryFn: () => getNews(selectedKeyword),
    enabled: !!selectedKeyword,
  })

  const removeHtmlTags = (str: string) => {
    return str.replace(/<[^>]+>/g, '')
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading news.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {news?.items.map((news, index) => (
        <div
          key={index}
          className="bg-white border rounded-md p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
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
            <span className="text-blue-500 hover:underline text-sm">
              Read more
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default NewsList
