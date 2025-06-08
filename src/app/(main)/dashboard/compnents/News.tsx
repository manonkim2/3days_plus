'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'
import { motion, useInView } from 'framer-motion'

import { NewsItem, RssNewsType } from '@/types/rss'
import { getFormattedDate } from '@/utils/formmattedDate'
import { Button } from '@/components/ui'

const News = ({ news }: { news: RssNewsType[] }) => {
  const queryClient = useQueryClient()
  const [visibleIndex, setVisibleIndex] = useState(0)

  const isLastIndex = visibleIndex >= 8
  const bgOpacity = useMemo(() => {
    const max = 0.95
    return (visibleIndex / 9) * max
  }, [visibleIndex])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    queryClient.setQueryData(['rss-news'], news)
  }, [news, queryClient])

  return (
    <div className="relative w-full flex flex-col items-center pb-xxl">
      <motion.div
        className="absolute inset-0 bg-black -z-10"
        style={{ opacity: bgOpacity }}
        animate={{
          width: isLastIndex ? '90%' : '100%',
          borderRadius: isLastIndex ? '36px' : '0px',
          margin: isLastIndex ? '0 auto' : '0',
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.article
        className="flex mx-auto container w-full justify-around"
        ref={ref}
      >
        <div className="flex sticky top-0 h-screen flex-col items-center justify-center text-6xl font-poppins">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="p-xxl text-fontTertiary border"
          >
            <p className="font-light tracking-wide">
              TOP
              <span className="text-6xl font-bold text-fontTertiary">10</span>
            </p>
            <p className="font-light leading-none tracking-[0.08em]">NEWS</p>

            <Link href="/news">
              <Button variant="outline" size="lg" className="w-full">
                More news
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="grid grid-flow-row w-[740px]">
          {news?.slice(0, 10).map((item, index) => {
            return (
              <NewsCard
                key={item.no}
                item={item}
                index={index}
                onVisible={(index) => setVisibleIndex(index)}
              />
            )
          })}
        </div>
      </motion.article>
    </div>
  )
}

const NewsCard = ({
  item,
  index,
  onVisible,
}: {
  item: NewsItem & { enclosureUrl?: string }
  index: number
  onVisible: (index: number) => void
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-50% 0px -50% 0px', once: false })

  useEffect(() => {
    if (inView) {
      onVisible(index)
    }
  }, [inView, index, onVisible])

  // 카드 0: 0.9, 마지막 카드: 1.0
  const minScale = 0.9
  const maxScale = 1
  const baseScale = minScale + (index / (10 - 1)) * (maxScale - minScale)

  return (
    <div
      ref={ref}
      className="sticky h-screen pt-[70px]"
      style={{
        zIndex: index,
        scale: baseScale,
        top: `calc(${index * 8}px)`,
      }}
    >
      <Link
        href={item.link || ''}
        target="_blank"
        rel="noopener noreferrer"
        className="p-md group block overflow-hidden shadow-md border transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
      >
        {item.enclosureUrl && (
          <div className="relative aspect-video w-full">
            <Image
              src={item.enclosureUrl}
              alt={item.title || 'today_news'}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          </div>
        )}
        <div className="flex px-xxl py-xl gap-xl items-center bg-white/50 backdrop-blur-md">
          <span className="text-6xl">{index + 1}</span>
          <div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-800">
              {item.title}
            </h2>
            <p className="text-base">{item.contentSnippet}</p>
            <span className="text-sm text-fontSecondary">
              {getFormattedDate(item.pubDate)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default News
