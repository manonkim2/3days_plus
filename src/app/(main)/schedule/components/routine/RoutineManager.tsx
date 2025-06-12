'use client'

import RoutineCard from './RoutineCard'
import { useRoutineManager } from './useRoutineManager'
import { getDateWithWeek } from '@/utils/formmattedDate'
import { useDateStore } from '@/stores/useDateStore'
import { Box, FormActionWrapper } from '@/components/shared'

const RoutineManager = () => {
  const { date, week } = useDateStore()

  const {
    routinesWithLogId,
    completedDay,
    handleClickComplete,
    handleClickUndo,
    handleOnClickDelete,
    formAction,
    isPending,
    completionPercents,
  } = useRoutineManager(date, week)

  return (
    <Box
      className="overflow-hidden h-full min-w-[180px] min-h-[240px]"
      title={
        <div className="flex flex-row md:flex-col xl:flex-row justify-between items-baseline px-xs pt-sm">
          <h1 className="text-fontPrimary text-xl md:text-2xl">Routines</h1>
          <span className="pr-md text-fontPrimary text-md">
            {getDateWithWeek(date)}
          </span>
        </div>
      }
    >
      <FormActionWrapper
        formAction={formAction}
        placeholder="Add your routine"
        disabled={isPending}
      />
      <div className="overflow-y-auto h-full">
        {routinesWithLogId?.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onClickComplete={handleClickComplete}
            onClickUndo={handleClickUndo}
            onClickDelete={handleOnClickDelete}
            completedDay={completedDay}
            week={week}
            percent={completionPercents[routine.id] || 0}
          />
        ))}
      </div>
    </Box>
  )
}

export default RoutineManager
