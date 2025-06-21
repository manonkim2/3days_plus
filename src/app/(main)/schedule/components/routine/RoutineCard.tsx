'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { format } from 'date-fns'

import Dropdown from './Dropdown'
import { Button } from '@/components/shared'
import { cn } from '@/utils/cn'
import { IRoutine } from '@/types/schedule'

interface IRoutineCardProps {
  routine: IRoutine & { logId?: number }
  onClickComplete: (id: number) => void
  onClickUndo: (id: number | undefined) => void
  onClickDelete: (id: number) => void
  completedDay: Record<string, Set<number>>
  week: Date[]
  percent: number
}

const RoutineCard = ({
  routine,
  onClickComplete,
  onClickUndo,
  onClickDelete,
  completedDay,
  week,
  percent,
}: IRoutineCardProps) => {
  const controls = useAnimation()

  useEffect(() => {
    const radius = Math.min(percent * 1.2)
    controls.start({
      clipPath: `circle(${radius}% at 35px 25%)`,
      transition: { duration: 1, ease: 'easeInOut' },
    })
  }, [percent, controls])

  const renderWeek = () => {
    const today = format(new Date(), 'yyyy-MM-dd')
    return (
      <div className="flex justify-between">
        {week.map((date, index) => {
          const day = format(date, 'EEE')[0]
          const dateKey = format(date, 'yyyy-MM-dd')
          const isCompleted = completedDay[dateKey]?.has(routine.id)
          const isToday = dateKey === today

          return (
            <span
              key={index}
              className={cn(
                'text-xs relative flex items-center justify-center',
                isCompleted
                  ? 'font-bold text-black'
                  : 'text-gray-300 font-light',
              )}
            >
              {day}
              {isToday && (
                <span
                  className="absolute"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid black',
                  }}
                />
              )}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-between relative border gap-sm rounded-lg h-[100px] min-w-[144px] p-lg lg:p-lg mt-md',
      )}
    >
      <motion.div
        initial={{ clipPath: 'circle(0% at 0% 0%)' }}
        animate={controls}
        className="absolute left-0 top-0 h-full w-full bg-black opacity-10 pointer-events-none"
      />

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{routine.name}</span>
        <Dropdown
          disabled={Boolean(!routine.logId)}
          onUndo={() => onClickUndo(routine.logId)}
          onDelete={() => onClickDelete(routine.id)}
        />
      </div>

      {!routine.logId ? (
        <Button
          onClick={() => onClickComplete(routine.id)}
          size="sm"
          className="z-1000"
        >
          Complete
        </Button>
      ) : (
        <>{renderWeek()}</>
      )}
    </div>
  )
}

export default RoutineCard
