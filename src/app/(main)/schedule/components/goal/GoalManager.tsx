'use client'

import { useTaskContext } from '@/context/TaskContext'
import React, { useMemo, useState } from 'react'
import { format, getISOWeek } from 'date-fns'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GoalType } from '@/prisma/client'
import GoalList from './GoalList'

const GoalManager = () => {
  const { date } = useTaskContext()
  const [tab, setTab] = useState<GoalType>('WEEK')

  const handleChangeTab = (val: string) => {
    setTab(val as GoalType)
  }

  const formattedDate = useMemo(() => {
    return {
      YEAR: `Goal for ${format(date, 'yyyy')}`,
      MONTH: `Goal for ${format(date, 'MMMM')}`,
      WEEK: `Goal for Week ${getISOWeek(date)} of ${format(date, 'yyyy')}`,
    }
  }, [date])

  return (
    <div className="flex flex-col gap-md rounded-lg border border-primary/30 shadow-md p-md bg-background ring-1 ring-primary/10">
      <div className="flex flex-col items-start">
        <h2 className="text-fontPrimary text-xl font-semibold">My Goals</h2>
        <p className="text-sm text-muted-foreground">
          Set your goals by year, month, or week.
        </p>
      </div>

      <Tabs defaultValue={tab} onValueChange={handleChangeTab}>
        <TabsList className="grid w-full grid-cols-3 mt-sm mb-md">
          <TabsTrigger value="YEAR">Year</TabsTrigger>
          <TabsTrigger value="MONTH">Month</TabsTrigger>
          <TabsTrigger value="WEEK">Week</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <div className="text-sm text-muted-foreground mb-sm">
            {formattedDate[tab]}
          </div>
          <GoalList tab={tab} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GoalManager
