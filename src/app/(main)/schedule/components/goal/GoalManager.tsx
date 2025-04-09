'use client'

import { useTaskContext } from '@/context/TaskContext'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GoalType } from '@/prisma/client'
import GoalList from './GoalList'
import Box from '@/components/Box'

const GoalManager = () => {
  const { date } = useTaskContext()
  const [tab, setTab] = useState<GoalType>('WEEK')

  const handleChangeTab = (val: string) => {
    setTab(val as GoalType)
  }

  return (
    <Box className="flex flex-col h-full overflow-auto max-h-[60vh]">
      <h2 className="text-fontPrimary text-xl font-semibold">My Goals</h2>
      <p className="text-sm text-muted-foreground">
        Break your goals down by year, month, or week.
      </p>

      <Tabs defaultValue={tab} onValueChange={handleChangeTab}>
        <TabsList className="grid w-full grid-cols-3 mt-sm mb-md">
          <TabsTrigger value="YEAR">Year</TabsTrigger>
          <TabsTrigger value="MONTH">Month</TabsTrigger>
          <TabsTrigger value="WEEK">Week</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="h-full">
          <GoalList tab={tab} />
        </TabsContent>
      </Tabs>
    </Box>
  )
}

export default GoalManager
