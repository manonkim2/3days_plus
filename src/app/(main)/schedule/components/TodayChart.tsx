'use client'

import { useMemo } from 'react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { useRoutineWeekContext } from '../context'
import { ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  completed: {
    label: 'Completed Routines',
    color: 'hsl(var(--chart-2))',
  },
}

const TodayChart = () => {
  const { routines, day } = useRoutineWeekContext()

  const completedRoutineRatio = useMemo(() => {
    if (routines.length === 0) return 0

    const completedCount = routines.filter((item) => item.complete).length
    return completedCount / routines.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routines, day])

  const chartData = useMemo(() => {
    const completedCount = routines.filter((item) => item.complete).length
    return [
      {
        completed: completedCount,
        total: routines.length,
        fill: 'hsl(var(--chart-2))',
      },
    ]
  }, [routines])

  const percentage = useMemo(() => {
    return routines.length === 0 ? 0 : Math.round(completedRoutineRatio * 100)
  }, [completedRoutineRatio, routines.length])

  const footerMessage = useMemo(() => {
    if (percentage === 100) {
      return "You're a star! All routines completed."
    } else if (percentage >= 70) {
      return 'Almost there! Keep up the great work.'
    } else if (percentage >= 30) {
      return "Good progress! You're on the right track."
    } else {
      return "Ready to start? Let's get moving!"
    }
  }, [percentage])

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-w-[300px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={completedRoutineRatio * 360}
          innerRadius={80}
          outerRadius={110}
        >
          <RadialBar
            dataKey="completed"
            background
            cornerRadius={10}
            fill={chartData[0].fill}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  const percentage =
                    routines.length === 0
                      ? 0
                      : Math.round(
                          (chartData[0].completed / chartData[0].total) * 100,
                        )
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {percentage}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Completed
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      <p className="leading-none text-muted-foreground text-sm">
        {footerMessage}
      </p>
    </div>
  )
}

export default TodayChart
