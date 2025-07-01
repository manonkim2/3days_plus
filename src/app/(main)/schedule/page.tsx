export const dynamic = 'force-dynamic'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import SchedulePage from './SchedulePage'
import { getCategory, getTask } from './components/task/actions'
import { getRoutineLog, getRoutines } from './components/routine/actions'
import { getDate, getWeekKey } from '@/utils/formmattedDate'
import { prefetch } from '@/lib/prefetch'
import { getUserInfo } from '@/lib/supabase/actions'
import { redirect } from 'next/navigation'

const SchedulePageWrapper = async () => {
  const user = await getUserInfo()
  const queryClient = new QueryClient()
  const today = new Date()

  if (!user) {
    redirect('/login')
  }

  await Promise.all([
    prefetch(queryClient, ['tasks', getDate(today)], () => getTask(today)),
    prefetch(queryClient, ['category'], () => getCategory()),
    prefetch(queryClient, ['routines'], () => getRoutines()),
    prefetch(queryClient, ['routine-logs-week', getWeekKey(today)], () =>
      getRoutineLog(today, true),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SchedulePage />
    </HydrationBoundary>
  )
}

export default SchedulePageWrapper
