export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { fetcher } from '@/lib/fetcher'
import { IWeatherData } from '@/lib/getWeather'
import { getUserInfo } from '@/lib/supabase/actions'
import { RssNewsType } from '@/types/rss'
import { IQuotes, getPinnedQuote } from './(main)/dashboard/actions'
import DashboardClient from './(main)/dashboard/compnents/DashboardClient'
import {
  getRoutines,
  getRoutineLog,
} from './(main)/schedule/components/routine/actions'
import { getTask } from './(main)/schedule/components/task/actions'

const DashBoardPage = async () => {
  const [user, weather, quotes, news] = await Promise.all([
    getUserInfo(),
    fetcher<IWeatherData>('/api/weather', { cache: 'force-cache' }),
    fetcher<IQuotes[]>('/api/quotes', { cache: 'force-cache' }),
    fetcher<RssNewsType[]>('/api/rss', { cache: 'force-cache' }),
  ])

  const [routines, routinelog, tasks, pinnedQuote] = user?.id
    ? await Promise.all([
        getRoutines(),
        getRoutineLog(new Date()),
        getTask(),
        getPinnedQuote(),
      ])
    : [[], [], [], null]

  return (
    <div className="relative h-screen bg-black/40">
      <Image
        src="/background.jpg"
        alt="fullscreen background"
        fill
        className="fixed inset-0 object-cover -z-50 left-0"
        priority
      />
      <div className="relative z-10 h-full overflow-y-auto">
        <DashboardClient
          user={user?.name || ''}
          weather={weather}
          quotes={quotes}
          news={news}
          routines={routines}
          routineLog={routinelog}
          tasks={tasks}
          pinnedQuote={pinnedQuote?.quoteId || null}
        />
      </div>
    </div>
  )
}

export default DashBoardPage
