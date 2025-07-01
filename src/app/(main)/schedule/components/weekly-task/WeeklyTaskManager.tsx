'use client'

import dynamic from 'next/dynamic'
import Box from '@/components/shared/Box'

const WeeklyTasksChart = dynamic(() => import('./WeeklyTasksChart'), {
  ssr: false,
})

const WeeklyTaskManager = () => {
  return (
    <Box className="flex flex-1 min-h-[240px]">
      <h2 className="text-xl font-semibold text-fontPrimary">
        This Week&apos;s Task & Routine Success Rate
      </h2>
      <p className="text-sm text-muted-foreground">
        Showing completion rates for all tasks and routines
      </p>
      <div className="h-full flex justify-center items-center">
        <WeeklyTasksChart />
      </div>
    </Box>
  )
}

export default WeeklyTaskManager
