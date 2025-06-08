'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import KeywordNews from './KeywordNews'
import { getRssNews } from '@/lib/getRssNews'
import { useNewsStore } from '@/stores/useNewsStore'
import { getFormattedDate } from '@/utils/formmattedDate'
import { RssNewsType } from '@/types/rss'

const Keyword = dynamic(() => import('./Keyword'))

const NewsList = ({ isUser }: { isUser: boolean }) => {
  const selectedKeyword = useNewsStore((s) => s.selectedKeyword)

  const { data: todayNews } = useQuery({
    queryKey: ['rss-news'],
    queryFn: getRssNews,
    staleTime: 1000 * 60 * 30, // 30분
  })

  return (
    <>
      <Keyword />

      {!selectedKeyword ? (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
          {todayNews?.map((item) => <NewsCard item={item} key={item.no} />)}
        </div>
      ) : (
        <KeywordNews isUser={isUser} />
      )}
    </>
  )
}

const NewsCard = ({ item }: { item: RssNewsType }) => {
  return (
    <Link
      href={item.link || ''}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transform transition-all hover:scale-[1.01]"
    >
      {item.enclosureUrl && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={item.enclosureUrl}
            alt={item.title || ''}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading="eager"
          />
        </div>
      )}

      <div className="absolute w-full bottom-0 left-0 p-md group-hover:bg-black/40 backdrop-blur-lg">
        <p className="text-white text-xl font-semibold">{item.title}</p>
        <p className="text-xs text-zinc-300">
          {getFormattedDate(item.pubDate)}
        </p>
      </div>
    </Link>
  )
}

export default NewsList
