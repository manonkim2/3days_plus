'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus } from 'lucide-react'

import { useGoalItems } from './useGoalItem'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useTaskContext } from '@/context/TaskContext'
import { GoalType } from '@/prisma/client'
import Checkbox from '@/components/Checkbox'

const GoalList = ({ tab }: { tab: GoalType }) => {
  const { date } = useTaskContext()
  const [input, setInput] = useState('')

  const { goalItems, addGoal, toggleGoal, deleteGoal } = useGoalItems(tab, date)

  const handleAdd = () => {
    if (!input.trim()) return
    addGoal.mutate(input)
    setInput('')
  }

  const handleToggle = (id: number, completed: boolean) => {
    toggleGoal.mutate({ id, completed: !completed })
  }

  const handleDelete = (id: number) => {
    deleteGoal.mutate(id)
  }

  const sortedGoals = useMemo(() => {
    return [...goalItems].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    )
  }, [goalItems])

  const completedCount = goalItems.filter((g) => g.completed).length
  const totalCount = goalItems.length
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="flex flex-col gap-md mt-md">
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">{percent}%</span>
        </div>
        <Progress value={percent} />
      </div>

      {percent === 100 && (
        <p className="text-sm text-green-500 font-semibold">
          🎉 All goals completed!
        </p>
      )}

      <Input
        className="h-8 text-sm"
        placeholder="Enter a new goal"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
        onSave={handleAdd}
      />

      <ul className="flex flex-col gap-xs flex-grow overflow-hidden">
        <AnimatePresence>
          {sortedGoals.map((goal) => (
            <motion.li
              key={goal.id}
              layout
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                layout: { type: 'spring', stiffness: 500, damping: 30 },
                opacity: { duration: 0.25 },
                y: { duration: 0.3, ease: 'easeOut' },
              }}
              className={`flex justify-between items-center px-3 py-xs shadow-sm transition ${
                goal.completed ? 'opacity-60' : 'bg-card hover:bg-accent'
              }`}
            >
              <div onClick={() => handleToggle(goal.id, goal.completed)}>
                <Checkbox checked={goal.completed} text={goal.content} />
              </div>
              <Trash2
                className="w-4 h-4 opacity-50 cursor-pointer"
                onClick={() => handleDelete(goal.id)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default GoalList
