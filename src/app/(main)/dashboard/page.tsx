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
  IRoutine,
  IroutineLog,
} from '../schedule/components/routine/actions'

const DashBoardPage = async () => {
  const user = await getUserInfo()
  const weather = await getWeather('Seoul')

  const newsCardItems = await fetchDashboardNews()

  let routines: IRoutine[] = []
  let routinelog: IroutineLog[] = []

  if (user?.id) {
    routines = await getRoutines()
    routinelog = await getRoutineLog(new Date())
  }

  return (
    <div>
      <div className="flex flex-col justify-between h-screen bg-[#1E1E1E] pb-xxl">
        <Title user={user?.name || ''} />
        <DashboardSummary
          weather={weather}
          routines={routines}
          routineLog={routinelog}
        />
      </div>
      <News newsItems={newsCardItems} />
    </div>
  )
}

export default DashBoardPage
