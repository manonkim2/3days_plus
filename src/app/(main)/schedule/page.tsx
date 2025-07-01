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

const SchedulePageWrapper = async () => {
  const queryClient = new QueryClient()
  const today = new Date()

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
