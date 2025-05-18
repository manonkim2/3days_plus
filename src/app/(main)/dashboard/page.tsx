export const dynamic = 'force-dynamic'

import Title from './compnents/Title'
import News from './compnents/News'
import DashboardSummary from './compnents/DashboardSummary'
import { getUserInfo } from '@/lib/supabase/actions'
import { IWeatherData } from '@/lib/getWeather'
import {
  getRoutineLog,
  getRoutines,
} from '../schedule/components/routine/actions'
import { getTask } from '../schedule/components/task/actions'
import { getPinnedQuote, IQuotes } from './actions'

const DashBoardPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const [user, weatherRes, quotesRes] = await Promise.all([
    getUserInfo(),
    fetch(`${baseUrl}/api/weather`),
    fetch(`${baseUrl}/api/quotes`),
  ])

  const weather: IWeatherData = await weatherRes.json()
  const quotes: IQuotes[] = await quotesRes.json()

  if (!user?.id) {
    return (
      <div>
        <div className="flex flex-col justify-between h-screen bg-[#1E1E1E] pb-xxl">
          <Title user={''} />
          <DashboardSummary
            weather={weather}
            routines={[]}
            routineLog={[]}
            tasks={[]}
            quotes={quotes}
            pinnedQuote={null}
          />
        </div>
        <News />
      </div>
    )
  }

  const [routines, routinelog, tasks, pinnedQuote] = await Promise.all([
    getRoutines(),
    getRoutineLog(new Date()),
    getTask(),
    getPinnedQuote(),
  ])

  return (
    <div>
      <div className="flex flex-col justify-between h-screen bg-[#1E1E1E] pb-xxl">
        <Title user={user?.name || ''} />
        <DashboardSummary
          weather={weather}
          routines={routines}
          routineLog={routinelog}
          tasks={tasks}
          quotes={quotes}
          pinnedQuote={pinnedQuote?.quoteId || null}
        />
      </div>
      <News />
    </div>
  )
}

export default DashBoardPage
