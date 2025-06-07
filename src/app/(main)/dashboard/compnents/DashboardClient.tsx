'use client'

import { useState } from 'react'

import { IWeatherData } from '@/lib/getWeather'
import { RssNewsType } from '@/types/rss'
import { IQuotes } from '../actions'
import DashboardSummary from './DashboardSummary'
import News from './News'
import Title from './Title'

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

  return (
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="w-full flex flex-col">
        <Title
          user={user}
          onTypingDone={() => setShowDashboard(true)}
          showDashboard={showDashboard}
        />

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
        </div>
      </div>
      <News news={news} />
    </div>
  )
}

export default DashboardClient
