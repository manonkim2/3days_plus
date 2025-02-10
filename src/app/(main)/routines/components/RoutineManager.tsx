'use client'

import { useActionState, useState } from 'react'

import FormActionWrapper from '@/components/FormActionWrapper'
import { createRoutine, IRoutine } from '../actions'
import { Plus } from 'lucide-react'
import Box from '@/components/Box'

interface IRoutineManagerProps {}

const RoutineManager = ({}: IRoutineManagerProps) => {
  const [routines, setRoutines] = useState<IRoutine[]>([])

  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const newKeyword = await createRoutine(formData)

      if (newKeyword) {
        setRoutines((prev) => [...prev, newKeyword])
      }
    },
    null,
  )

  return (
    <Box>
      <FormActionWrapper
        formAction={formAction}
        placeholder="Add your routine"
        isPending={isPending}
        button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
      />
    </Box>
  )
}

export default RoutineManager
