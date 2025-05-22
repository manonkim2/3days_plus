'use client'

import dynamic from 'next/dynamic'

const WeeklyCategoryTasks = dynamic(() => import('./WeeklyCategoryTasks'), {
  ssr: false,
})
const WeeklyTasksChart = dynamic(() => import('./WeeklyTasksChart'), {
  ssr: false,
})

const WeeklyTaskManager = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-fontPrimary">
        This Week&apos;s Task Success Rate
      </h2>
      <p className="text-sm text-muted-foreground">
        Showing completion rates for all tasks and selected category
      </p>
      <div className="flex gap-xl pt-xl">
        <WeeklyTasksChart />
        <WeeklyCategoryTasks />
      </div>
    </div>
  )
}

export default WeeklyTaskManager
