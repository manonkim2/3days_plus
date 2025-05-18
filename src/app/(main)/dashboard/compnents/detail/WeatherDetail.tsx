'use client'

import { useWeatherSuggestion } from '@/lib/useWeatherSuggestion'
import { IWeatherData } from '@/lib/getWeather'
import Image from 'next/image'

interface WeatherDetailProps {
  weather: IWeatherData
}

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const WeatherDetail = ({ weather }: WeatherDetailProps) => {
  const { data: suggestion, isLoading, isError } = useWeatherSuggestion(weather)

  return (
    <div className="grid grid-rows-[3fr_1.2fr_2fr] h-full">
      {/* 상단 요약 */}
      <div className="flex justify-between pb-xl">
        <div className="flex flex-col justify-between">
          <h2 className="text-xl text-fontTertiary">📍 {weather.city}</h2>

          <div className="flex items-end gap-sm">
            <p className="text-[84px] leading-none outline-text -mb-[6px]">
              {Math.round(weather.temperature)}
            </p>
            <p className="text-base text-fontTertiary">
              Feels like {Math.round(weather.feels_like)}°C
            </p>
          </div>
        </div>

        <Image
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt="weather icon"
          width={140}
          height={140}
          className="self-center"
        />
      </div>

      {/* 상세 정보 */}
      <div className="grid grid-cols-2 text-fontTertiary text-base py-xl">
        <div>💧 Humidity: {weather.humidity}%</div>
        <div>🌬 Wind: {weather.wind} m/s</div>
        <div>🌅 Sunrise: {formatTime(weather.sunrise)}</div>
        <div>🌇 Sunset: {formatTime(weather.sunset)}</div>
      </div>

      <div className="text-sm text-white">
        <p className="text-muted-foreground mb-1">🧥 오늘의 추천 옷차림</p>
        {isLoading ? (
          <p>추천 생성 중...</p>
        ) : isError ? (
          <p>추천을 불러오지 못했어요.</p>
        ) : (
          <p className="text-base font-medium">{suggestion}</p>
        )}
      </div>
    </div>
  )
}

export default WeatherDetail
