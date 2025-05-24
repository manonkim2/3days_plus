'use client'

import RoutineCard from './RoutineCard'
import { useRoutineManager } from './useRoutineManager'
import { getDateWithWeek } from '@/utils/formmattedDate'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'
import { useDateStore } from '@/stores/useDateStore'

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
      className="overflow-hidden h-full min-w-[180px]"
      title={
        <div className="flex flex-col xl:flex-row justify-between items-baseline px-xs pt-sm">
          <h1 className="text-fontPrimary text-2xl">Routines</h1>
          <span className="pr-md text-fontPrimary text-md">
            {getDateWithWeek(date)}
          </span>
        </div>
      }
    >
      <FormActionWrapper
        formAction={formAction}
        placeholder="Add your routine"
        isPending={isPending}
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
