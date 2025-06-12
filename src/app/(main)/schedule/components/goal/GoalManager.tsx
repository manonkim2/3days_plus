'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalType } from '@/prisma/client'

import Box from '@/components/shared/Box'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const GoalList = dynamic(() => import('./GoalList'))

const GoalManager = () => {
  const [tab, setTab] = useState<GoalType>('WEEK')

  const handleChangeTab = (val: string) => {
    setTab(val as GoalType)
  }

  return (
    <Box className="flex flex-col flex-1 overflow-hidden min-h-[240px]">
      <h2 className="text-fontPrimary text-xl font-semibold">My Goals</h2>
      <div className="h-full">
        <Tabs
          defaultValue={tab}
          onValueChange={handleChangeTab}
          className="flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3 mt-sm mb-md">
            <TabsTrigger value="YEAR">Year</TabsTrigger>
            <TabsTrigger value="MONTH">Month</TabsTrigger>
            <TabsTrigger value="WEEK">Week</TabsTrigger>
          </TabsList>
        </Tabs>
        <GoalList tab={tab} />
      </div>
    </Box>
  )
}

export default GoalManager
