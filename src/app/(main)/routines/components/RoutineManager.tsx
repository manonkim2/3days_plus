'use client'

import { useActionState, useState } from 'react'
import { Check, Plus } from 'lucide-react'

import { completeRoutine, createRoutine, IRoutine } from '../actions'
import FormActionWrapper from '@/components/FormActionWrapper'
import Box from '@/components/Box'
import { Button } from '@/components/ui'

const RoutineManager = ({ routinesData }: { routinesData: IRoutine[] }) => {
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
    const completedLog = await completeRoutine(id)

    if (completedLog) {
      setRoutines((prev) =>
        prev.map((routine) =>
          routine.id === id ? { ...routine, complete: true } : routine,
        ),
      )
    }
  }
  return (
    <Box>
      <div className="flex flex-col gap-md">
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
          />
        ))}
      </div>
    </Box>
  )
}

const RoutineItem = ({
  routine,
  onClickComplete,
}: {
  routine: IRoutine
  onClickComplete: (id: number) => void
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
        <div className="flex items-center gap-xs bg-black">
          <Check className="h-4 w-4" color="white" />
          <p className="text-sm text-white ">Completed</p>
        </div>
      )}
    </div>
  )
}

export default RoutineManager
