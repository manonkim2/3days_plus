'use client'

import { useState } from 'react'
import SummaryCard from './SummaryCard'
import WeatherDetail from './detail/WeatherDetail'
import { getWeather, IWeatherData } from '@/lib/weather'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const DashboardSummary = () => {
  const [activeCard, setActiveCard] = useState<
    'task' | 'routine' | 'motivation' | 'weather'
  >('task')
  // const [city, setCity] = useState('Seoul')
  const city = 'Seoul'

  const {
    data: weather,
    isFetching,
    isError,
  } = useQuery<IWeatherData>({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city),
    enabled: !!city,
    staleTime: 1000 * 60 * 30,
    retry: false,
  })

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-lg w-full h-full max-h-[50vh] container">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard
          title="Today's Tasks"
          value="3 / 5 done"
          percent={60}
          onClick={() => setActiveCard('task')}
          isActive={activeCard === 'task'}
        />
        <SummaryCard
          title="Routine Completion"
          value="80%"
          percent={80}
          onClick={() => setActiveCard('routine')}
          isActive={activeCard === 'routine'}
        />
        <SummaryCard
          title="Keep it up!"
          value="You're on the right track."
          onClick={() => setActiveCard('motivation')}
          isActive={activeCard === 'motivation'}
        />
        <SummaryCard
          title={
            weather?.city ? (
              <span className="flex items-center gap-xs">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">{weather.city}</span>
              </span>
            ) : (
              'Weather'
            )
          }
          onClick={() => setActiveCard('weather')}
          isActive={activeCard === 'weather'}
        >
          {isFetching && <p className="text-white text-lg">Loading...</p>}
          {isError && <p className="text-red-400 text-lg">Error</p>}
          {weather && (
            <div className="flex items-start justify-between">
              <div className="flex flex-col justify-center">
                <div className="flex items-end leading-tight">
                  <p className="text-5xl font-bold text-white">
                    {Math.round(weather.temperature)}
                  </p>
                  <p className="text-lg text-muted-foreground ml-1">°C</p>
                </div>

                <p className="text-sm capitalize text-fontTertiary pl-xs">
                  {weather.description}
                </p>
              </div>

              <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather icon"
                width={60}
                height={60}
                className="drop-shadow-lg"
              />
            </div>
          )}
        </SummaryCard>
      </div>

      {/* 우측 상세 영역 */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md min-h-[240px]">
        {/* {activeCard === 'task' && <TaskDetail />}
        {activeCard === 'routine' && <RoutineDetail />}
        {activeCard === 'motivation' && <MotivationDetail />}*/}
        {activeCard === 'weather' && <WeatherDetail weather={weather!} />}
      </div>
    </div>
  )
}

export default DashboardSummary
