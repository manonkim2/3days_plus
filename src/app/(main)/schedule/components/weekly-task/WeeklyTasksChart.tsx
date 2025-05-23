'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useScheduleContext } from '@/context/ScheduleContext'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useTasks } from '../task/useTasks'

const chartConfig = {
  completionRate: {
    label: 'All Tasks',
    color: 'hsl(var(--chart-1))',
  },
  categoryCompletionRate: {
    label: 'Selected Category',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const WeeklyTasksChart = () => {
  const { week, selectedCategoryId } = useScheduleContext()
  const { tasks } = useTasks({ dates: week })

  const tasksByDay = useMemo(() => {
    return week.reduce(
      (acc, day) => {
        const formattedDay = format(day, 'yyyy-MM-dd')
        acc[formattedDay] = tasks.filter(
          (task) => format(task.date, 'yyyy-MM-dd') === formattedDay,
        )
        return acc
      },
      {} as Record<string, typeof tasks>,
    )
  }, [week, tasks])

  const chartData = useMemo(() => {
    return week.map((day) => {
      const formattedDay = format(day, 'yyyy-MM-dd')
      const tasksForDay = tasksByDay[formattedDay] || []
      const categoryTasks = tasksForDay.filter(
        (task) => task.categoryId === selectedCategoryId,
      )

      const completedCount = tasksForDay.filter((task) => task.completed).length
      const categoryCompletedCount = categoryTasks.filter(
        (task) => task.completed,
      ).length

      return {
        day: format(day, 'EEE'),
        completionRate:
          tasksForDay.length > 0
            ? (completedCount / tasksForDay.length) * 100
            : 0,
        categoryCompletionRate:
          categoryTasks.length > 0
            ? (categoryCompletedCount / categoryTasks.length) * 100
            : 0,
      }
    })
  }, [tasksByDay, week, selectedCategoryId])

  return (
    <div className="hidden lg:block w-full">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="completionRate"
            fill="var(--color-completionRate)"
            radius={[4, 4, 0, 0]}
            barSize={16}
            opacity={0.85}
          />
          {selectedCategoryId && (
            <Bar
              dataKey="categoryCompletionRate"
              fill="var(--color-categoryCompletionRate)"
              radius={[4, 4, 0, 0]}
              barSize={16}
              opacity={0.85}
            />
          )}
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default WeeklyTasksChart
