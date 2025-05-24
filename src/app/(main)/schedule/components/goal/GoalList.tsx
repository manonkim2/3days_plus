'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus } from 'lucide-react'
import { format, getWeek, startOfMonth } from 'date-fns'
import { ko } from 'date-fns/locale'

import { useGoalItems } from './useGoalItem'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { GoalType } from '@/prisma/client'
import Checkbox from '@/components/Checkbox'
import { useDateStore } from '@/stores/useDateStore'

const GoalList = ({ tab }: { tab: GoalType }) => {
  const { date } = useDateStore()
  const [input, setInput] = useState('')

  const { goalItems, addGoal, toggleGoal, deleteGoal, isLoading } =
    useGoalItems(tab, date)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleAdd = () => {
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

  const completedCount = goalItems?.filter((g) => g.completed).length
  const totalCount = goalItems?.length
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  const getWeekOfMonth = (date: Date): number => {
    const weekOfDate = getWeek(date, { weekStartsOn: 1, locale: ko })
    const weekOfStart = getWeek(startOfMonth(date), {
      weekStartsOn: 1,
      locale: ko,
    })

    return weekOfDate - weekOfStart + 1
  }

  const getPeriodLabel = (tab: GoalType, date: Date): string => {
    const year = date.getFullYear()
    const monthName = format(date, 'MMMM')
    const week = getWeekOfMonth(date)

    switch (tab) {
      case 'YEAR':
        return `Goals for ${year}`
      case 'MONTH':
        return `Goals for ${monthName} ${year}`
      case 'WEEK':
        return `Goals for Week ${week} of ${monthName} ${year}`
      default:
        return ''
    }
  }

  return (
    <div className="flex flex-col pb-sm gap-md h-full overflow-auto">
      <div className="flex flex-col gap-sm">
        <span className="text-sm font-semibold text-fontPrimary">
          {getPeriodLabel(tab, date)}
        </span>
        <div className="flex flex-col gap-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs text-muted-foreground">{percent}%</span>
          </div>
          <Progress value={percent} aria-label={`${tab} 할일 완료율`} />
          {percent === 100 && (
            <p className="text-sm text-green-500 font-semibold">
              🎉 All goals completed!
            </p>
          )}
        </div>
        <Input
          className="h-8 text-sm"
          placeholder="Enter a new goal"
          value={input}
          onChange={handleInputChange}
          button={<Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />}
          onSave={handleAdd}
          disabled={isLoading}
        />
      </div>
      <ul className="flex flex-col h-full gap-xs overflow-y-scroll">
        {goalItems.length === 0 && (
          <div className="flex flex-col justify-center h-[150px]">
            <p className="text-sm text-muted-foreground text-center">
              No goals yet. Start by adding one!
            </p>
          </div>
        )}

        <AnimatePresence>
          {sortedGoals.map((goal) => (
            <motion.li
              key={goal.id}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                layout: { type: 'spring', stiffness: 500, damping: 30 },
                opacity: { duration: 0.25 },
                y: { duration: 0.3, ease: 'easeOut' },
              }}
              className={`flex justify-between items-center py-xs shadow-sm transition ${
                goal.completed ? 'opacity-60' : 'bg-card hover:bg-accent'
              }`}
            >
              <Checkbox
                id={`goal-${tab}-${goal.id}`}
                checked={goal.completed}
                text={goal.content}
                onClick={() => handleToggle(goal.id, goal.completed)}
              />
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
