'use client'

import { useWeatherSuggestion } from '@/lib/useWeatherSuggestion'
import { IWeatherData } from '@/lib/getWeather'

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
    <div className="flex flex-col justify-between h-full text-fontTertiary text-sm">
      <div className="flex flex-col sm:flex-row justify-between">
        {/* 상세 날씨 */}
        <div className="grid grid-cols-2 gap-xs sm:flex sm:flex-col">
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬 Wind: {weather.wind} m/s</p>
          <p>🌅 Sunrise: {formatTime(weather.sunrise)}</p>
          <p>🌇 Sunset: {formatTime(weather.sunset)}</p>
        </div>

        <div className="hidden sm:flex sm:flex-col">
          <p>Feels like {Math.round(weather.feels_like)}°C</p>
          <p>{weather.description}</p>
        </div>
      </div>

      <div className="backdrop-blur-md p-sm">
        <p className="font-bold text-white">🧥 현재 추천 옷차림</p>
        {isLoading ? (
          <p>추천 생성 중...</p>
        ) : isError ? (
          <p>추천을 불러오지 못했어요.</p>
        ) : (
          <p className="text-white">{suggestion}</p>
        )}
      </div>
    </div>
  )
}

export default WeatherDetail
