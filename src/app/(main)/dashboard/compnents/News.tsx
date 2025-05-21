'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { NewsCardItem } from '@/types/rss'
import { getFormattedDate } from '@/utils/formmattedDate'
import { Button } from '@/components/ui'
import { useRef } from 'react'
import { useDashboardNews } from '@/lib/useDashboardNews'

const News = () => {
  const { data: newsItems, isLoading, isError } = useDashboardNews()
  const { scrollYProgress } = useScroll()

  const bgColor = useTransform(scrollYProgress, [0, 1], ['#ffffff', '#1E1E1E'])
  const animatedColor = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    ['#000000', '#1E1E1E', '#ffffff'],
  )

  const borderRadius = useTransform(scrollYProgress, [0.9, 1], ['0px', '36px'])
  const width = useTransform(scrollYProgress, [0.9, 1], ['100vw', '90vw'])

  if (isLoading) return <div className="text-center py-10">Loading news...</div>

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Failed to load news.</div>
    )

  return (
    <motion.article
      className="mx-auto"
      style={{ backgroundColor: bgColor, borderRadius, width }}
    >
      <div className="flex justify-between container">
        <div className="sticky top-0 w-[400px] h-screen flex flex-col items-center justify-center text-6xl font-poppins">
          <motion.div
            className="border p-xxl"
            style={{ borderColor: animatedColor }}
          >
            <motion.p
              className="font-light text-fontPrimary tracking-wide"
              style={{ color: animatedColor }}
            >
              TOP
              <motion.span
                className="text-6xl font-bold"
                style={{ color: animatedColor }}
              >
                10
              </motion.span>
            </motion.p>
            <motion.p
              className="font-light leading-none tracking-[0.08em]"
              style={{ color: animatedColor }}
            >
              NEWS
            </motion.p>

            <Link href="/news">
              <Button variant="outline" size="lg" className="w-full">
                More news
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-flow-row w-[780px]">
          {newsItems?.map((item, index) => {
            return <NewsCard key={item.no} item={item} index={index} />
          })}
        </div>
      </div>
    </motion.article>
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
      className="sticky h-screen pt-xxl"
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
              loading="lazy"
            />
          </div>
        )}
        <div className="flex px-xxl py-xl gap-xl items-center">
          <span className="text-6xl">{index + 1}</span>
          <div>
            <h2 className="text-[22px] font-semibold mb-2 group-hover:text-blue-600">
              {item.title}
            </h2>
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
