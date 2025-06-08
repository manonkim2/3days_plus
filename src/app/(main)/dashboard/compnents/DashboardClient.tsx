'use client'

import { useRef, useState } from 'react'
import { ArrowUpCircle } from 'lucide-react'

import { IQuotes } from '../actions'
import DashboardSummary from './DashboardSummary'
import News from './News'
import Title from './Title'
import Footer from '@/components/Footer'
import { IWeatherData } from '@/lib/getWeather'
import { RssNewsType } from '@/types/rss'
import { IRoutine, IroutineLog, ITask } from '@/types/schedule'

interface DashboardClientProps {
  user: string
  weather: IWeatherData
  quotes: IQuotes[]
  news: RssNewsType[]
  routines: IRoutine[]
  routineLog: IroutineLog[]
  tasks: ITask[]
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
  const ref = useRef<HTMLDivElement>(null)

  const [showDashboard, setShowDashboard] = useState(false)

  const scrollToTop = () => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 h-screen overflow-y-auto" ref={ref}>
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
