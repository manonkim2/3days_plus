'use client'

import Link from 'next/link'
import RoutineChart from './RoutineChart'
import { IRoutine, IroutineLog } from '@/types/schedule'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui'

interface IRoutineDetail {
  routines: IRoutine[]
  completedRoutines: IroutineLog[]
}

const RoutineDetail = ({ completedRoutines, routines }: IRoutineDetail) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <h2 className="text-xl text-fontTertiary">
        🔁 Today&apos;s Routine Completion
      </h2>
      <div className="flex flex-col gap-md overflow-hidden h-full justify-center">
        {routines.length === 0 ? (
          <div className="flex justify-center items-center text-fontSecondary border border-dashed rounded-md h-full text-base mt-md">
            No routines yet?
            <br /> Let&apos;s set one up and start building great habits!
          </div>
        ) : (
          <div className="grid grid-cols-[1fr_2fr] gap-md">
            <div className="flex flex-col gap-sm">
              {routines.map(({ name, id }) => (
                <RoutineCard
                  key={id}
                  title={name}
                  completed={completedRoutines.some(
                    (log) => log.routineId === id,
                  )}
                />
              ))}
            </div>
            <RoutineChart totalRoutines={routines.length} />
          </div>
        )}
      </div>
      <Button asChild className="w-full mt-md" variant="outline">
        <Link href="/schedule">Go to Task Schedule Page</Link>
      </Button>
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
