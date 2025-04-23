'use client'

import { cn } from '@/utils/cn'
import {
  IRoutine,
  IroutineLog,
} from '@/app/(main)/schedule/components/routine/actions'
import RoutineChart from './RoutineChart'

interface IRoutineDetail {
  routines: IRoutine[]
  completedRoutines: IroutineLog[]
}

const RoutineDetail = ({ completedRoutines, routines }: IRoutineDetail) => {
  return (
    <div className="flex flex-col gap-md">
      <h2 className="text-xl text-fontTertiary">
        📋 Today’s Routine Completion
      </h2>
      <div className="grid grid-cols-[1fr_2fr] gap-md">
        <div className="flex flex-col gap-sm">
          {routines.map(({ name, id }) => (
            <RoutineCard
              key={id}
              title={name}
              completed={completedRoutines.some((log) => log.routineId === id)}
            />
          ))}
        </div>
        <RoutineChart totalRoutines={routines.length} />
      </div>
    </div>
  )
}

const RoutineCard = ({
  title,
  completed,
}: {
  title: string
  completed: boolean
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-3 text-sm transition-shadow',
        completed
          ? 'bg-green-600/10 border-green-500'
          : 'bg-white/5 border-white/10',
      )}
    >
      <span className="flex items-center gap-2">
        <span>{completed ? '✅' : '⬜'}</span>
        <span className="text-fontTertiary">{title}</span>
      </span>
    </div>
  )
}

export default RoutineDetail
