import { useQuery } from '@tanstack/react-query'
import { IWeatherData } from '@/app/api/weather/route'

export const useWeatherSuggestion = (weather?: IWeatherData) => {
  return useQuery({
    queryKey: ['weather-suggestion', weather?.city],
    queryFn: async () => {
      if (!weather) throw new Error('No weather data')

      const res = await fetch('/api/weather-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: weather.city,
          temperature: weather.temperature,
          feels_like: weather.feels_like,
          description: weather.description,
          humidity: weather.humidity,
          wind: weather.wind,
          min: weather.temp_min,
          max: weather.temp_max,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '추천을 불러오지 못했습니다.')

      return data.suggestion as string
    },
    enabled: !!weather,
    staleTime: 1000 * 60 * 60 * 3,
  })
}
