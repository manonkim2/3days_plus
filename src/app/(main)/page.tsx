export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { fetcher } from '@/lib/fetcher'
import { getUserInfo } from '@/lib/supabase/actions'
import { RssNewsType } from '@/types/rss'
import { getPinnedQuote, getQuotes } from './dashboard/actions'
import DashboardClient from './dashboard/compnents/DashboardClient'
import {
  getRoutines,
  getRoutineLog,
} from './schedule/components/routine/actions'
import { getTask } from './schedule/components/task/actions'
import { format } from 'date-fns'
import { prefetch } from '@/lib/prefetch'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { IRoutine, IroutineLog, ITask } from '@/types/schedule'
import { IWeatherData } from '../api/weather/route'

const DashBoardPage = async () => {
  const queryClient = new QueryClient()

  const [user, weather, quotes, news] = await Promise.all([
    getUserInfo(),
    fetcher<IWeatherData>('/api/weather'),
    getQuotes(),
    fetcher<RssNewsType[]>('/api/rss'),
  ])

  if (user?.id) {
    const today = new Date()
    const todayKey = format(today, 'yyyy-MM-dd')

    await Promise.all([
      prefetch<IRoutine[]>(queryClient, ['routines'], () => getRoutines()),
      prefetch<IroutineLog[]>(queryClient, ['routine-logs-day', todayKey], () =>
        getRoutineLog(today),
      ),
      prefetch<ITask[]>(queryClient, ['tasks', todayKey], () =>
        getTask(new Date()),
      ),
      prefetch<{ quoteId: number } | null>(queryClient, ['pinned-quote'], () =>
        getPinnedQuote(),
      ),
    ])
  }

  return (
    <>
      <div className="absolute bg-black/30 inset-0">
        <Image
          src="/back.jpg"
          alt="fullscreen background"
          fill
          className="fixed inset-0 object-cover -z-50"
          priority
        />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardClient
          user={user?.name || null}
          weather={weather}
          quotes={quotes}
          news={news}
        />
      </HydrationBoundary>
    </>
  )
}

export default DashBoardPage
