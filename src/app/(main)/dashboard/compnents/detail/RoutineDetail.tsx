'use client'

import { useRouter } from 'next/navigation'
import { IRoutine, IroutineLog } from '@/types/schedule'
import { cn } from '@/utils/cn'
import { Button } from '@/components/shared'

interface IRoutineDetail {
  routines: IRoutine[]
  completedRoutines: IroutineLog[]
}

const RoutineDetail = ({ completedRoutines, routines }: IRoutineDetail) => {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-md overflow-hidden h-full justify-center">
        {routines.length === 0 ? (
          <div className="flex justify-center items-center text-fontTertiary border border-dashed rounded-md text-base mb-sm h-full">
            No routines yet?
            <br /> Let&apos;s set one up and start building great habits!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm overflow-y-scroll">
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
        )}
      </div>
      <Button onClick={() => router.push('/schedule')}>
        Go to Schedule Page
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
