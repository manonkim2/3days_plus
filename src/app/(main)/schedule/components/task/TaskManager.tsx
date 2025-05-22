'use client'

import dynamic from 'next/dynamic'
import TaskList from './TaskList'
const DayTaskChart = dynamic(() => import('./DayTaskChart'), { ssr: false })

const TaskManager = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-fontPrimary pb-md">
        Today&apos;s Tasks
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] ">
        <DayTaskChart />
        <TaskList />
      </div>
    </>
  )
}

export default TaskManager
