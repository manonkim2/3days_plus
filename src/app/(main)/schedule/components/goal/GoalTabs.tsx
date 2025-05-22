'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GoalList from './GoalList'
import { GoalType } from '@/prisma/client'

const GoalTabs = () => {
  const [tab, setTab] = useState<GoalType>('WEEK')

  const handleChangeTab = (val: string) => {
    setTab(val as GoalType)
  }

  return (
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
  )
}

export default GoalTabs
