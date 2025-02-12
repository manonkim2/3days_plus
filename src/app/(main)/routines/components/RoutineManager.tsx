'use client'

import { useActionState, useEffect } from 'react'
import { Check, Plus, Undo2 } from 'lucide-react'

import { useRoutineWeekContext } from '../context'
import {
  completeRoutine,
  createRoutine,
  getRoutineLog,
  IRoutine,
  unCompleteRoutine,
} from '../actions'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'
import { Button } from '@/components/ui'
import { getDateWithWeek } from '@/utils/formmattedDate'

const RoutineManager = ({ routinesData }: { routinesData: IRoutine[] }) => {
  const { day, setRoutines, routines } = useRoutineWeekContext()

  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const newKeyword = await createRoutine(formData)

      if (newKeyword) {
        setRoutines((prev) => [...prev, newKeyword])
      }
    },
    null,
  )

  const handleClickComplete = async (id: number) => {
    const completedLog = await completeRoutine(id, day)

    if (completedLog) {
      setRoutines((prev) =>
        prev.map((routine) =>
          routine.id === id
            ? { ...routine, complete: true, logId: completedLog.id }
            : routine,
        ),
      )
    }
  }

  const handleClickUndo = async (id: number | undefined) => {
    if (id) {
      await unCompleteRoutine(id)

      setRoutines((prev) =>
        prev.map((routine) =>
          routine.logId === id
            ? { ...routine, complete: false, logId: undefined }
            : routine,
        ),
      )
    }
  }

  useEffect(() => {
    setRoutines(routinesData)

    const fetchRoutines = async () => {
      const dayRoutineLog = await getRoutineLog(day)

      setRoutines((prev) =>
        prev.map((routine) => {
          const log = dayRoutineLog.find((log) => log.routineId === routine.id)
          return {
            ...routine,
            complete: Boolean(log),
            logId: log?.id,
          }
        }),
      )
    }

    fetchRoutines()
  }, [day, routinesData, setRoutines])

  return (
    <Box title={getDateWithWeek(day)}>
      <div className="flex flex-col gap-md py-lg">
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add your routine"
          isPending={isPending}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
        {routines?.map((routine) => (
          <RoutineItem
            key={routine.id}
            routine={routine}
            onClickComplete={handleClickComplete}
            onClickUndo={handleClickUndo}
          />
        ))}
      </div>
    </Box>
  )
}

const RoutineItem = ({
  routine,
  onClickComplete,
  onClickUndo,
}: {
  routine: IRoutine
  onClickComplete: (id: number) => void
  onClickUndo: (id: number | undefined) => void
}) => {
  return (
    <div className="flex flex-col border p-md gap-sm">
      <span>{routine.name}</span>
      {!routine.logId ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onClickComplete(routine.id)}
        >
          Complete
        </Button>
      ) : (
        <div className="flex items-center justify-between gap-xs bg-black">
          <div className="flex items-center">
            <Check className="h-3 w-3" color="white" />
            <p className="text-xs text-white ">Completed</p>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onClickUndo(routine.logId)}
          >
            <Undo2 className="h-3 w-3" color="white" />
            <p className="text-xs text-white ">Undo</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoutineManager
