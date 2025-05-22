'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Box from '@/components/Box'
const GoalTabs = dynamic(() => import('./GoalTabs'))

const GoalManager = () => {
  return (
    <Box className="flex flex-col flex-grow overflow-hidden max-h-[55vh]">
      <h2 className="text-fontPrimary text-xl font-semibold">My Goals</h2>
      <GoalTabs />
    </Box>
  )
}

export default GoalManager
