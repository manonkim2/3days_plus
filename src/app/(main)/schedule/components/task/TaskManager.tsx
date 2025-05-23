'use client'

import dynamic from 'next/dynamic'
import TaskList from './TaskList'
import Box from '@/components/Box'
const DayTaskChart = dynamic(() => import('./DayTaskChart'), { ssr: false })

const TaskManager = () => {
  return (
    <Box className="overflow-hidden flex flex-col flex-1">
      <h2 className="text-xl font-semibold text-fontPrimary pb-md">
        Today&apos;s Tasks
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] overflow-y-scroll h-full">
        <DayTaskChart />
        <TaskList />
      </div>
    </Box>
  )
}

export default TaskManager
