'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useTaskContext } from '../context'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const WeeklyTasksChart = () => {
  const { weekTasks, week, selectedCategoryId } = useTaskContext()

  const tasksByDay = useMemo(() => {
    return week.reduce(
      (acc, day) => {
        const formattedDay = format(day, 'yyyy-MM-dd')
        acc[formattedDay] = weekTasks.filter(
          (task) => format(task.date, 'yyyy-MM-dd') === formattedDay,
        )
        return acc
      },
      {} as Record<string, typeof weekTasks>,
    )
  }, [week, weekTasks])

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
    <div className="w-full">
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
            stackId="a"
            fill="var(--color-desktop)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="categoryCompletionRate"
            stackId="a"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default WeeklyTasksChart
