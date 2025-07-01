'use client'

import { useMemo } from 'react'
import { eachDayOfInterval, format } from 'date-fns'
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useDateStore } from '@/stores/useDateStore'
import { ITask } from '@/types/schedule'
import { useQuery } from '@tanstack/react-query'
import { getTask } from '../task/actions'
import { getDate } from '@/utils/formmattedDate'

const chartConfig = {
  completionRate: {
    label: 'task_completion_rate',
    color: 'hsl(var(--chart-2))',
  },
  routineCompletionRate: {
    label: 'routine_completion_rate',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const WeeklyTasksChart = () => {
  const { week } = useDateStore()

  const weekdays = eachDayOfInterval({
    start: week.start,
    end: week.end,
  })

  const { data: tasks = [] } = useQuery<ITask[]>({
    queryKey: ['tasks-week', getDate(week.start)],
    queryFn: () => getTask(week.start, true),
    enabled: !!week.start,
  })

  const tasksByDay = useMemo(() => {
    return weekdays.reduce(
      (acc, day) => {
        const formattedDay = format(day, 'yyyy-MM-dd')
        acc[formattedDay] = tasks.filter(
          (task) => format(task.date, 'yyyy-MM-dd') === formattedDay,
        )
        return acc
      },
      {} as Record<string, typeof tasks>,
    )
  }, [weekdays, tasks])

  const chartData = useMemo(() => {
    return weekdays.map((day) => {
      const formattedDay = format(day, 'yyyy-MM-dd')
      const tasksForDay = tasksByDay[formattedDay] || []
      const completedCount = tasksForDay.filter((task) => task.completed).length

      return {
        day: format(day, 'EEE'),
        completionRate:
          tasksForDay.length > 0
            ? Math.round((completedCount / tasksForDay.length) * 100)
            : 0,
      }
    })
  }, [tasksByDay, weekdays])

  return (
    <ResponsiveContainer
      width="100%"
      height="75%"
      className="block pr-xl"
      // className="hidden lg:block pr-xl"
    >
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="completionRate"
            type="monotone"
            stroke="var(--color-completionRate)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-completionRate' }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
          {/* <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
          /> */}
        </LineChart>
      </ChartContainer>
      {/* <ChartContainer config={chartConfig}>
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
      </ChartContainer> */}
    </ResponsiveContainer>
  )
}

export default WeeklyTasksChart
