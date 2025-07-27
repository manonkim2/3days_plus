'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'
import { format } from 'date-fns'

import SummaryCard from './SummaryCard'
import { getPinnedQuote, IQuotes } from '../actions'
import { IWeatherData } from '@/app/api/weather/route'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/shared'
import RoutineDetail from './detail/RoutineDetail'
import MotivationDetail from './detail/MotivationDetail'
import {
  getRoutineLog,
  getRoutines,
} from '../../schedule/components/routine/actions'
import { IRoutine, IroutineLog, ITask } from '@/types/schedule'
import { getTask } from '../../schedule/components/task/actions'

const WeatherDetail = dynamic(() => import('./detail/WeatherDetail'))
const TaskDetail = dynamic(() => import('./detail/TaskDetail'))

interface DashboardSummaryProps {
  weather: IWeatherData
  quotes: IQuotes[]
  isLogin: boolean
}

const DashboardSummary = ({
  weather,
  quotes,
  isLogin,
}: DashboardSummaryProps) => {
  const router = useRouter()
  const today = new Date()
  const todayKey = format(today, 'yyyy-MM-dd')

  const { data: completedRoutines = [] } = useQuery<IroutineLog[]>({
    queryKey: ['routine-logs-day', todayKey],
    queryFn: () => getRoutineLog(today),
  })

  const { data: routines = [] } = useQuery<IRoutine[]>({
    queryKey: ['routines'],
    queryFn: getRoutines,
  })

  const { data: tasks = [] as ITask[] } = useQuery<ITask[]>({
    queryKey: ['tasks', todayKey],
    queryFn: ({ queryKey }) => {
      const [, date] = queryKey
      return getTask(new Date(date as string))
    },
  })

  const routineCompletedPercent = Math.round(
    (completedRoutines?.length / routines?.length) * 100,
  )

  const tasksCompletedPercent =
    tasks.length > 0
      ? Math.round(
          (tasks.filter((task) => task.completed).length / tasks.length) * 100,
        )
      : 0

  const { data: pinnedQuoteData } = useQuery({
    queryKey: ['pinned-quote'],
    queryFn: getPinnedQuote,
    enabled: isLogin,
  })

  const randomQuote = useMemo(() => {
    if (!quotes.length) return null
    const pinnedId = pinnedQuoteData?.quoteId

    return pinnedId ? quotes.find((q) => q.id === pinnedId) : quotes[1]
  }, [pinnedQuoteData, quotes])

  const LoginPrompt = () => {
    return (
      <div className="flex flex-col gap-sm h-full">
        <div className="h-full flex items-center justify-center text-fontSecondary text-base ">
          Login required.
        </div>
        <Button onClick={() => router.push('/login')}>Log In</Button>
      </div>
    )
  }

  return (
    <div className="container grid w-full md:h-[50vh] mb-32 md:grid-cols-2 gap-lg">
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
        detail={<WeatherDetail weather={weather} />}
      >
        <div className="flex justify-between items-center h-full">
          <div className="flex flex-col h-full justify-end">
            <div className="flex items-baseline">
              <p className="text-5xl font-bold text-white">
                {Math.round(weather.temperature)}
              </p>
              <p className="text-xl text-muted-foreground ml-1">°C</p>
            </div>
            <p className="text-sm text-fontTertiary">
              Feels like {Math.round(weather.feels_like)}°C
            </p>
          </div>
          <div className="h-full">
            <div>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt="weather icon"
                width={98}
                height={98}
              />
            </div>
          </div>
        </div>
      </SummaryCard>

      {/* motivation */}
      <SummaryCard
        title="Keep it up!"
        detail={
          isLogin ? <MotivationDetail quotes={quotes} /> : <LoginPrompt />
        }
      >
        <div className="items-baseline">
          <p className="text-xl text-white">{randomQuote?.content}</p>
          <p className="text-sm text-muted-foreground">{randomQuote?.author}</p>
        </div>
      </SummaryCard>

      {/* task */}
      <SummaryCard
        title="Today's Tasks"
        detail={isLogin ? <TaskDetail tasks={tasks} /> : <LoginPrompt />}
      >
        <div className="flex items-baseline">
          <p className="text-5xl font-bold text-white">
            {tasksCompletedPercent}
          </p>
          <p className="text-xl text-muted-foreground ml-1">%</p>
        </div>
        <Progress
          aria-label="오늘의 할일 완료율"
          value={tasksCompletedPercent}
          className="bg-white/10"
        />
      </SummaryCard>

      {/* routine */}
      <SummaryCard
        title="Today's Routine"
        detail={
          isLogin ? (
            <RoutineDetail
              routines={routines}
              completedRoutines={completedRoutines}
            />
          ) : (
            <LoginPrompt />
          )
        }
      >
        <div className="flex items-baseline">
          <p className="text-5xl font-bold text-white">
            {completedRoutines.length} / {routines.length}
          </p>
          <p className="text-xl text-muted-foreground ml-1">done</p>
        </div>
        <Progress
          aria-label="오늘의 루틴 완료율"
          value={routineCompletedPercent}
          className="bg-white/10"
        />
      </SummaryCard>
    </div>
  )
}

export default DashboardSummary
