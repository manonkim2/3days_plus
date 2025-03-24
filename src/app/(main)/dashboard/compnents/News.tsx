'use client'

import { NewsCardItem } from '@/types/rss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const News = ({ newsItems }: { newsItems: NewsCardItem[] }) => {
  return (
    <div className="space-y-4">
      {newsItems.map((item, index) => (
        <motion.div
          key={item.no}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
          className="p-4 bg-white rounded-xl shadow-md"
        >
          <Link
            href={item.link || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border hover:border-blue-500"
          >
            {item.enclosureUrl && (
              <div className="relative aspect-video w-full">
                <Image
                  src={item.enclosureUrl}
                  alt={item.title || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500">{item.pubDate}</p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.contentSnippet}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default News
