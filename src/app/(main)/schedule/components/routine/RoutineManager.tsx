'use client'

import RoutineCard from './RoutineCard'
import { useRoutineManager } from './useRoutineManager'
import { getDateWithWeek } from '@/utils/formmattedDate'
import { useScheduleContext } from '@/context/ScheduleContext'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'

const RoutineManager = () => {
  const { date, week } = useScheduleContext()

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
      title={
        <div className="flex flex-col xl:flex-row justify-between items-baseline px-sm pt-sm">
          <h1 className="text-fontPrimary text-2xl">Routines</h1>
          <span className="text-fontPrimary text-md">
            {getDateWithWeek(date)}
          </span>
        </div>
      }
    >
      <div className="flex flex-col gap-sm pb-sm">
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add your routine"
          isPending={isPending}
        />
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
