export const dynamic = 'force-dynamic'

import Title from './compnents/Title'
import News from './compnents/News'
import DashboardSummary from './compnents/DashboardSummary'
import { getUserInfo } from '@/lib/supabase/actions'
import { fetchDashboardNews } from '@/lib/news'
import { getWeather } from '@/lib/weather'
import {
  getRoutineLog,
  getRoutines,
} from '../schedule/components/routine/actions'
import { getTask } from '../schedule/components/task/actions'
import { ITask, IRoutine, IroutineLog } from '@/types/schedule'
import { getPinnedQuote, getQuotes, IQuotes } from './actions'

const DashBoardPage = async () => {
  const user = await getUserInfo()
  const weather = await getWeather('Seoul')

  const newsCardItems = await fetchDashboardNews()

  let routines: IRoutine[] = []
  let routinelog: IroutineLog[] = []
  let tasks: ITask[] = []
  let quotes: IQuotes[] = []
  let pinnedQuote: { quoteId: number } | null = { quoteId: 0 }

  if (user?.id) {
    routines = await getRoutines()
    routinelog = await getRoutineLog(new Date())
    tasks = await getTask()
    quotes = await getQuotes()
    pinnedQuote = await getPinnedQuote()
  }

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
      <News newsItems={newsCardItems} />
    </div>
  )
}

export default DashBoardPage
