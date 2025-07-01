'use client'

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
import { getRoutineLog, getRoutines } from '../routine/actions'

const chartConfig = {
  completionRate: {
    label: 'Task',
    color: 'hsl(var(--chart-2))',
  },
  routineCompletionRate: {
    label: 'Routine',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const WeeklyTasksChart = () => {
  const { date, week } = useDateStore()

  const weekdays = eachDayOfInterval({
    start: week.start,
    end: week.end,
  })

  const { data: routines = [] } = useQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })

  const { data: logs = [] } = useQuery({
    queryKey: ['routine-logs-week', getDate(weekdays[0])],
    queryFn: () => getRoutineLog(date, true),
  })

  const { data: tasks = [] } = useQuery<ITask[]>({
    queryKey: ['tasks-week', getDate(week.start)],
    queryFn: () => getTask(week.start, true),
    enabled: !!week.start,
  })

  const groupByDate = <T extends { date: Date }>(
    items: T[],
    dates: Date[],
  ): Record<string, T[]> => {
    return dates.reduce(
      (acc, date) => {
        const key = format(date, 'yyyy-MM-dd')
        acc[key] = items.filter(
          (item) => format(item.date, 'yyyy-MM-dd') === key,
        )
        return acc
      },
      {} as Record<string, T[]>,
    )
  }

  const tasksByDay = groupByDate(tasks, weekdays)
  const logsByDay = groupByDate(logs, weekdays)

  const chartData = weekdays.map((day) => {
    const key = format(day, 'yyyy-MM-dd')
    const tasksForDay = tasksByDay[key] || []
    const logsForDay = logsByDay[key] || []

    const completedCount = tasksForDay.filter((task) => task.completed).length

    const routineCompletionRate =
      routines.length > 0
        ? Math.round((logsForDay.length / routines.length) * 100)
        : 0

    const completionRate =
      tasksForDay.length > 0
        ? Math.round((completedCount / tasksForDay.length) * 100)
        : 0

    return {
      day: format(day, 'EEE'),
      completionRate,
      routineCompletionRate,
    }
  })

  return (
    <ResponsiveContainer width="100%" height="80%" className="block pr-xl">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
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
              offset={10}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
          <Line
            dataKey="routineCompletionRate"
            type="monotone"
            stroke="var(--color-routineCompletionRate)"
            strokeWidth={2}
            dot={{ fill: 'var(--color-routineCompletionRate' }}
          >
            <LabelList
              position="top"
              offset={10}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}

export default WeeklyTasksChart
