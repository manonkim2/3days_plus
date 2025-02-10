'use client'

import { useActionState, useState } from 'react'
import { Check, Plus, Undo2 } from 'lucide-react'

import { useSelectedWeek } from '../context'
import {
  completeRoutine,
  createRoutine,
  IRoutine,
  unCompleteRoutine,
} from '../actions'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'
import { Button } from '@/components/ui'
import { getDateWithWeek } from '@/utils/formmattedDate'

const RoutineManager = ({ routinesData }: { routinesData: IRoutine[] }) => {
  const { day } = useSelectedWeek()

  const [routines, setRoutines] = useState<IRoutine[]>(routinesData)

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
          routine.id === id ? { ...routine, complete: true } : routine,
        ),
      )
    }
  }

  const handleClickUndo = async (id: number) => {
    const undoLog = await unCompleteRoutine(id)
  }

  return (
    <Box>
      <div className="flex flex-col gap-md">
        <span>{getDateWithWeek(day)}</span>
        <FormActionWrapper
          formAction={formAction}
          placeholder="Add your routine"
          isPending={isPending}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        />
        {routines.map((routine) => (
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
  onClickUndo: (id: number) => void
}) => {
  return (
    <div className="flex flex-col border p-md gap-sm">
      <span>{routine.name}</span>
      {!routine.complete ? (
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
            className="flex items-center"
            onClick={() => onClickUndo(routine.id)}
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
