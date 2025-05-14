export const dynamic = 'force-dynamic'

import Title from './compnents/Title'
import News from './compnents/News'
import DashboardSummary from './compnents/DashboardSummary'
import { getUserInfo } from '@/lib/supabase/actions'
import { getWeather } from '@/lib/weather'
import {
  getRoutineLog,
  getRoutines,
} from '../schedule/components/routine/actions'
import { getTask } from '../schedule/components/task/actions'
import { getPinnedQuote, getQuotes } from './actions'

const DashBoardPage = async () => {
  const [user, weather] = await Promise.all([
    getUserInfo(),
    getWeather('Seoul'),
  ])

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
            quotes={[]}
            pinnedQuote={null}
          />
        </div>
        <News />
      </div>
    )
  }

  const [routines, routinelog, tasks, quotes, pinnedQuote] = await Promise.all([
    getRoutines(),
    getRoutineLog(new Date()),
    getTask(),
    getQuotes(),
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
