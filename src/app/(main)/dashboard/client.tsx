'use client'

import { useEffect, useState } from 'react'

import { IWeatherData } from '@/lib/getWeather'
import { RssNewsType } from '@/types/rss'
import { IQuotes } from './actions'
import DashboardSummary from './compnents/DashboardSummary'
import News from './compnents/News'
import Title from './compnents/Title'

interface DashboardClientProps {
  user: string
  weather: IWeatherData
  quotes: IQuotes[]
  news: RssNewsType[]
  routines: any[]
  routineLog: any[]
  tasks: any[]
  pinnedQuote: number | null
}

const DashboardClient = ({
  user,
  weather,
  quotes,
  news,
  routines,
  routineLog,
  tasks,
  pinnedQuote,
}: DashboardClientProps) => {
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDashboard(true)
    }, 3000) // 타이틀 출력 시간 후
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="w-full bg-[#1E1E1E] min-h-screen flex flex-col">
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          showDashboard ? 'h-[150px]' : 'h-screen'
        }`}
      >
        <Title user={user} />
      </div>

      <div
        className={`transition-opacity duration-700 ease-in-out ${
          showDashboard ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <DashboardSummary
          weather={weather}
          routines={routines}
          routineLog={routineLog}
          tasks={tasks}
          quotes={quotes}
          pinnedQuote={pinnedQuote}
        />
        <News news={news} />
      </div>
    </div>
  )
}

export default DashboardClient
