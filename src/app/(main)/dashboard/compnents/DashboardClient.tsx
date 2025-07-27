'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpCircle } from 'lucide-react'

import { IQuotes } from '../actions'
import DashboardSummary from './DashboardSummary'
import News from './News'
import Title from './Title'
import { RssNewsType } from '@/types/rss'
import { Footer } from '@/components/shared'
import { IWeatherData } from '@/app/api/weather/route'

interface DashboardClientProps {
  user: string | null
  weather: IWeatherData
  quotes: IQuotes[]
  news: RssNewsType[]
}

const DashboardClient = ({
  user,
  weather,
  quotes,
  news,
}: DashboardClientProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showSummary, setShowSummary] = useState(false)

  const scrollToTop = () => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTypingComplete = () => {
    sessionStorage.setItem('visitedDashboard', 'true')
    setShowSummary(true)
  }

  useEffect(() => {
    const visited = sessionStorage.getItem('visitedDashboard') === 'true'

    if (visited) {
      setShowSummary(true)
    }
  }, [])

  return (
    <div className="relative z-10 h-screen overflow-y-auto px-md" ref={ref}>
      <Title
        user={user}
        onTypingDone={handleTypingComplete}
        showDashboard={showSummary}
      />
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          showSummary ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <DashboardSummary
          weather={weather}
          quotes={quotes}
          isLogin={Boolean(user)}
        />
      </div>

      <News news={news} />

      <div className="flex flex-col gap-xs justify-center items-center pt-xxl">
        <ArrowUpCircle
          className="w-6 h-6 border-white cursor-pointer animate-bounce"
          onClick={scrollToTop}
          color="white"
        />
        <span className="text-white text-sm">Scroll to Top</span>
      </div>

      <Footer />
    </div>
  )
}

export default DashboardClient
