'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { NewsCardItem } from '@/types/rss'
import { getFormattedDate } from '@/utils/formmattedDate'
import { Button } from '@/components/ui'
import { useRef } from 'react'

const News = ({ newsItems }: { newsItems: NewsCardItem[] }) => {
  return (
    <article className="w-screen">
      <div className="flex justify-between container">
        <div className="sticky top-0 w-[400px] h-screen flex flex-col items-center justify-center text-6xl font-poppins">
          <div>
            <p className="font-light text-fontPrimary tracking-wide">
              TOP<span className="text-6xl font-bold">10</span>
            </p>
            <p className="font-light leading-none tracking-[0.08em]">NEWS</p>
          </div>
          <Link href="/news">
            <Button variant="outline" size="lg">
              More news
            </Button>
          </Link>
        </div>

        <div className="grid grid-flow-row w-[780px]">
          {newsItems.map((item, index) => {
            return <NewsCard key={item.no} item={item} index={index} />
          })}
        </div>
      </div>
    </article>
  )
}

const NewsCard = ({ item, index }: { item: NewsCardItem; index: number }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // 카드 0: 0.9, 마지막 카드: 1.0
  const minScale = 0.9
  const maxScale = 1
  const baseScale = minScale + (index / (10 - 1)) * (maxScale - minScale)

  // 스크롤 진행에 따라 baseScale에서 0.9배로 줄어듬
  const finalScale = useTransform(
    scrollYProgress,
    [0, 1],
    [baseScale, baseScale * 0.9],
  )

  const rawY = useTransform(scrollYProgress, [0, 1], [index * 2, index * 5])

  const translateY = useSpring(rawY, {
    stiffness: 70, // 탄성 정도 (낮을수록 부드러움)
    damping: 30, // 감쇠 (높을수록 빨리 멈춤)
    mass: 0.8, // 질량 (클수록 더 느긋)
  })

  return (
    <motion.div
      layout
      className="sticky h-screen"
      style={{
        zIndex: index,
        scale: finalScale,
        top: `calc(${index * 8}px)`,
        y: translateY,
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={item.link || ''}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl overflow-hidden shadow-md border bg-white transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-blue-500"
      >
        {item.enclosureUrl && (
          <div className="relative aspect-video w-full">
            <Image
              src={item.enclosureUrl}
              alt={item.title || ''}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex px-xxl py-xl gap-xl items-center">
          <span className="text-6xl">{index + 1}</span>
          <div>
            <h1 className="text-[22px] font-semibold mb-2 group-hover:text-blue-600">
              {item.title}
            </h1>
            <p className="text-base text-fontSecondary">
              {item.contentSnippet}
            </p>
            <span className="text-sm text-fontTertiary">
              {getFormattedDate(item.pubDate)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default News
