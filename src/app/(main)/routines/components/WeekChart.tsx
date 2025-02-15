'use client'

import { TrendingUp } from 'lucide-react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'

import { CardContent, CardFooter } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import Box from '@/components/Box'
import { useRoutineWeekContext } from '../context'
import { useEffect, useState } from 'react'
import { getRoutineLog } from '../actions'
import { format } from 'date-fns'

const chartConfig = {
  week: {
    label: 'week',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const WeekChart = () => {
  const [chartData, setChartData] = useState<
    { week: string; complete: string }[]
  >([])

  console.log('🚀 ~ WeekChart ~ chartData:', chartData)

  const { week, routines } = useRoutineWeekContext()

  useEffect(() => {
    ;(async () => {
      if (!week || week.length === 0) return

      const logs = await getRoutineLog(undefined, week)

      const dataMap = new Map<string, number>()

      week.forEach((date) => {
        dataMap.set(format(date, 'yyyy-MM-dd'), 0)
      })

      logs.forEach((log) => {
        const logDate = format(log.date, 'yyyy-MM-dd')
        if (dataMap.has(logDate)) {
          dataMap.set(logDate, (dataMap.get(logDate) || 0) + 1)
        }
      })

      const formattedData = Array.from(dataMap.entries()).map(
        ([date, complete]) => ({
          week: date,
          complete: `${Math.round((complete / routines.length) * 100)}`,
        }),
      )

      setChartData(formattedData)
    })()
  }, [routines.length, week])

  return (
    <Box title="Week complete">
      <CardContent>
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
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="complete"
              type="natural"
              stroke="var(--color-week)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-week)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Box>
  )
}

export default WeekChart
