import {
  addDays,
  endOfWeek,
  format,
  isValid,
  startOfDay,
  startOfWeek,
} from 'date-fns'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

const KOREA_TIMEZONE = 'Asia/Seoul'

/**
 * @returns MM/DD 형식 변환 (예: "02/04")
 */
export function getShortDate(date: Date = new Date()): string {
  return format(date, 'MM/dd')
}

/**
 * @returns yyyy-MM-dd 형식 변환 (예: "2025-06-26")
 */
export function getDate(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd')
}

/**
 * @returns MM/DD ccc 형식 변환 (예: "02/04 Mon")
 */
export function getDateWithWeek(date: Date = new Date()): string {
  return format(date, 'MM/dd ccc')
}

/**
 * @returns yyyy-MM-dd hh:mm
 */
export function getFormattedDate(dateString?: string): string {
  if (!dateString) return ''

  const parsedDate = new Date(dateString)

  if (!isValid(parsedDate)) return '날짜 형식 오류'

  try {
    return format(parsedDate, 'yyyy-MM-dd a hh:mm')
  } catch {
    return '날짜 형식 오류'
  }
}

/**
 * date 해당주의 시작일 (일요일부터 시작)
 * react-query의 키값으로 사용
 * @return yyyy-MM-dd
 */
export function getWeekKey(date: Date) {
  return format(startOfWeek(date, { weekStartsOn: 0 }), 'yyyy-MM-dd')
}

export const getDateRangeInKST = (date: Date = new Date()) => {
  // 1. 입력된 UTC 날짜를 KST로 변환
  const kstDate = toZonedTime(date, KOREA_TIMEZONE)

  // 2. 그 날짜의 KST 자정
  const startKST = startOfDay(kstDate)
  const endKST = addDays(startKST, 1) // 다음 날 자정

  // 3. 다시 UTC로 변환
  const startUtc = fromZonedTime(startKST, KOREA_TIMEZONE)
  const endUtc = fromZonedTime(endKST, KOREA_TIMEZONE)

  return { startUtc, endUtc }
}

export const getWeekRangeInKST = (date: Date = new Date()) => {
  // 1. 해당 주의 KST 기준 일요일 자정
  const startKST = startOfWeek(date, { weekStartsOn: 0 })

  // 2. 해당 주의 KST 기준 토요일 자정
  const endKST = endOfWeek(date, { weekStartsOn: 0 })

  // 3. KST 시간을 UTC로 변환
  const startSunUtc = fromZonedTime(startKST, KOREA_TIMEZONE)
  const endSatUtc = fromZonedTime(endKST, KOREA_TIMEZONE)

  return { startSunUtc, endSatUtc }
}
