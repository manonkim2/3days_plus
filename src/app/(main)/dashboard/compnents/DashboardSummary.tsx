'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MapPin } from 'lucide-react'

import SummaryCard from './SummaryCard'
import WeatherDetail from './detail/WeatherDetail'
import RoutineDetail from './detail/RoutineDetail'
import TaskDetail from './detail/TaskDetail'
import { IWeatherData } from '@/lib/weather'
import { Progress } from '@/components/ui/progress'
import { ITask, IRoutine, IroutineLog } from '@/types/schedule'
import TasksDetail from './detail/TaskDetail'

interface DashboardSummaryProps {
  weather: IWeatherData
  routines: IRoutine[]
  routineLog: IroutineLog[]
  tasks: ITask[]
}

const DashboardSummary = ({
  weather,
  routines,
  routineLog: completedRoutines,
  tasks,
}: DashboardSummaryProps) => {
  const [activeCard, setActiveCard] = useState<
    'task' | 'routine' | 'motivation' | 'weather'
  >('weather')

  const routineCompletedPercent = Math.round(
    (completedRoutines.length / routines?.length) * 100,
  )

  const tasksCompletedPercent =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((task) => task.completed).length / tasks.length) * 100,
        )
      : 0

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-lg w-full h-full max-h-[50vh] container">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* weather */}
        <SummaryCard
          title={
            <span className="flex items-center gap-xs">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                {weather.city}
              </span>
            </span>
          }
          onClick={() => setActiveCard('weather')}
          isActive={activeCard === 'weather'}
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col h-full justify-end">
              <div className="flex items-baseline">
                <p className="text-5xl font-bold text-white">
                  {Math.round(weather.temperature)}
                </p>
                <p className="text-xl text-muted-foreground ml-1">°C</p>
              </div>
              <p className="text-sm capitalize text-fontTertiary pl-xs">
                {weather.description}
              </p>
            </div>
            <div className="h-full">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt="weather icon"
                width={98}
                height={98}
              />
            </div>
          </div>
        </SummaryCard>

        {/* motivation */}
        <SummaryCard
          title="Keep it up!"
          // value="You're on the right track."
          onClick={() => setActiveCard('motivation')}
          isActive={activeCard === 'motivation'}
        ></SummaryCard>

        {/* task */}
        <SummaryCard
          title="Today's Tasks"
          onClick={() => setActiveCard('task')}
          isActive={activeCard === 'task'}
        >
          <div>
            <div className="flex items-baseline">
              <p className="text-5xl font-bold text-white">
                {tasksCompletedPercent}
              </p>
              <p className="text-xl text-muted-foreground ml-1">%</p>
            </div>
            <Progress
              value={tasksCompletedPercent}
              className="mt-3 h-2 bg-white/10"
            />
          </div>
        </SummaryCard>

        {/* routine */}
        <SummaryCard
          title="Today's Routine"
          onClick={() => setActiveCard('routine')}
          isActive={activeCard === 'routine'}
        >
          <div>
            <div className="flex items-baseline">
              <p className="text-5xl font-bold text-white">
                {completedRoutines.length} / {routines.length}
              </p>
              <p className="text-xl text-muted-foreground ml-1">done</p>
            </div>
            <Progress
              value={routineCompletedPercent}
              className="mt-3 h-2 bg-white/10"
            />
          </div>
        </SummaryCard>
      </div>

      {/* 우측 상세 영역 */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md min-h-[240px]">
        {activeCard === 'task' && <TasksDetail tasks={tasks} />}
        {activeCard === 'routine' && (
          <RoutineDetail
            routines={routines}
            completedRoutines={completedRoutines}
          />
        )}
        {/* {activeCard === 'motivation' && <MotivationDetail />}*/}
        {/* {activeCard === 'weather' && <WeatherDetail weather={weather} />} */}
      </div>
    </div>
  )
}

export default DashboardSummary
