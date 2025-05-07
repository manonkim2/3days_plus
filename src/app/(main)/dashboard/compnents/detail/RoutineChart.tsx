'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { getRoutineLog } from '@/app/(main)/schedule/components/routine/actions'
import { useMemo } from 'react'
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'

const chartConfig = {
  completionRate: {
    label: 'Completion Rate',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

const RoutineChart = ({ totalRoutines }: { totalRoutines: number }) => {
  const today = new Date()

  const week = useMemo(() => {
    const today = new Date()
    return eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    })
  }, [])

  const { data: realData = [], isLoading } = useQuery({
    queryKey: ['week-routine'],
    queryFn: async () => {
      const logs = await getRoutineLog(undefined, week)

      return week.map((day) => {
        const dayStr = format(day, 'yyyy-MM-dd')
        const logsForDay = logs.filter(
          (log) => format(log.date, 'yyyy-MM-dd') === dayStr,
        )

        const completed = logsForDay.length

        const completionRate =
          totalRoutines > 0 ? Math.round((completed / totalRoutines) * 100) : 0

        return { day: format(day, 'EEE'), completionRate }
      })
    },
  })

  const getFakeChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days.map((day) => ({
      day,
      completionRate: Math.floor(Math.random() * 90),
    }))
  }

  const chartData = isLoading ? getFakeChartData() : realData

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-fontTertiary">
          Your Weekly Routine Performance
        </CardTitle>
        <CardDescription>
          {format(startOfWeek(today), 'EEE, MMM dd')} –{' '}
          {format(endOfWeek(today), 'EEE, MMM dd')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="day"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="completionRate" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="completionRate"
              layout="vertical"
              fill="var(--color-completionRate)"
              radius={4}
            >
              <LabelList
                dataKey="day"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="completionRate"
                position="insideRight"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default RoutineChart
