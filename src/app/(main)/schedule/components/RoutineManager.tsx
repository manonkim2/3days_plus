'use client'

import { useActionState, useEffect } from 'react'
import { Check, Undo2 } from 'lucide-react'

import { useDateContext } from '../context'
import {
  completeRoutine,
  createRoutine,
  getRoutineLog,
  IRoutine,
  unCompleteRoutine,
} from '../actions/routineActions'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'
import { Button } from '@/components/ui'
import { getDateWithWeek } from '@/utils/formmattedDate'

const RoutineManager = ({ routinesData }: { routinesData: IRoutine[] }) => {
  const { date, setRoutines, routines } = useDateContext()

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
    const completedLog = await completeRoutine(id, date)

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
      const dayRoutineLog = await getRoutineLog(date)

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
  }, [date, routinesData, setRoutines])

  return (
    <Box title={getDateWithWeek(date)}>
      <div className="flex flex-col gap-sm py-lg">
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add your routine"
          isPending={isPending}
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
