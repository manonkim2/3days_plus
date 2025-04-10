'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoalType } from '@/prisma/client'
import GoalList from './GoalList'
import Box from '@/components/Box'

const GoalManager = () => {
  const [tab, setTab] = useState<GoalType>('WEEK')

  const handleChangeTab = (val: string) => {
    setTab(val as GoalType)
  }

  return (
    <Box className="flex flex-col flex-grow overflow-hidden max-h-[55vh]">
      <h2 className="text-fontPrimary text-xl font-semibold">My Goals</h2>

      <Tabs
        defaultValue={tab}
        onValueChange={handleChangeTab}
        className="flex flex-col h-full pb-sm"
      >
        <TabsList className="grid w-full grid-cols-3 mt-sm mb-md">
          <TabsTrigger value="YEAR">Year</TabsTrigger>
          <TabsTrigger value="MONTH">Month</TabsTrigger>
          <TabsTrigger value="WEEK">Week</TabsTrigger>
        </TabsList>

        <GoalList tab={tab} />
      </Tabs>
    </Box>
  )
}

export default GoalManager
