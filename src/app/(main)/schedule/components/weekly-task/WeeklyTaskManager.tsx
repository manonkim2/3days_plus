'use client'

import dynamic from 'next/dynamic'
import Box from '@/components/Box'
import { useState } from 'react'

const WeeklyCategoryTasks = dynamic(() => import('./WeeklyCategoryTasks'), {
  ssr: false,
})
const WeeklyTasksChart = dynamic(() => import('./WeeklyTasksChart'), {
  ssr: false,
})

const WeeklyTaskManager = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  )

  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId ? Number(categoryId) : null)
  }

  return (
    <Box className="hidden md:flex flex-1">
      <h2 className="text-xl font-semibold text-fontPrimary">
        This Week&apos;s Task Success Rate
      </h2>
      <p className="text-sm text-muted-foreground">
        Showing completion rates for all tasks and selected category
      </p>
      <div className="flex gap-xl pt-xl">
        <WeeklyTasksChart selectedCategoryId={selectedCategoryId} />
        <WeeklyCategoryTasks handleChangeCategory={handleChangeCategory} />
      </div>
    </Box>
  )
}

export default WeeklyTaskManager
