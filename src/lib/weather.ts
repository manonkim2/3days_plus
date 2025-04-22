import { IWeather } from '@/types/weather'

export interface IWeatherData {
  temperature: number
  description: string
  icon: string
  city: string
  feels_like: number
  humidity: number
  wind: number
  sunrise: number
  sunset: number
}

export const getWeather = async (city: string): Promise<IWeatherData> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city,
  )}&appid=${apiKey}&units=metric`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('날씨 정보를 불러오지 못했어요.')
  }

  const data: IWeather = await res.json()

  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    feels_like: data.main.feels_like,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  }
}
