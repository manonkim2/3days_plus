'use client'

import { useMemo } from 'react'
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { useTasks } from './useTasks'

const chartConfig = {
  completed: {
    label: 'Completed Routines',
    color: 'hsl(var(--chart-2))',
  },
}

const DayTaskChart = () => {
  const { tasks } = useTasks()

  const completedRoutineRatio = useMemo(() => {
    if (tasks.length === 0) return 0

    return tasks.filter((task) => task.completed).length / tasks.length
  }, [tasks])

  const chartData = useMemo(() => {
    const completedCount = tasks.filter((item) => item.completed).length
    return [
      {
        completed: completedCount,
        total: tasks.length,
        fill: 'hsl(var(--chart-2))',
      },
    ]
  }, [tasks])

  return (
    <div className="hidden lg:block">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-w-[280px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={completedRoutineRatio * 360}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
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
                    tasks.length === 0
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
    </div>
  )
}

export default DayTaskChart
