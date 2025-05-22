import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { format } from 'date-fns'

import SchedulePage from './SchedulePage'
import { getCategory, getTask } from './components/task/actions'
import { getRoutines } from './components/routine/actions'
import { getKoreanTime } from '@/utils/formmattedDate'

const SchedulePageWrapper = async () => {
  const queryClient = new QueryClient()
  const today = getKoreanTime(new Date())
  const todayKey = format(today, 'yyyy-MM-dd')

  const [tasks, categories, routines] = await Promise.all([
    getTask(today),
    getCategory(),
    getRoutines(),
  ])

  queryClient.setQueryData(['tasks', todayKey], tasks)
  queryClient.setQueryData(['category'], categories)
  queryClient.setQueryData(['routines'], routines)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SchedulePage />
    </HydrationBoundary>
  )
}

export default SchedulePageWrapper
