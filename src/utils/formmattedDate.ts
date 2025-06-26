import { format, startOfWeek } from 'date-fns'

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
export function getFormattedDate(dateString: string | undefined): string {
  if (!dateString) return ''

  try {
    const parsedDate = new Date(dateString)
    return format(parsedDate, 'yyyy-MM-dd a hh:mm')
  } catch (error) {
    console.error('Error formatting date:', error)
    return '날짜 형식 오류'
  }
}

/**
 * 주어진 Date 객체를 한국 시간(Asia/Seoul) 기준으로 변환
 * @param date 변환할 UTC Date (기본값: 현재 시간)
 * @returns 한국 시간 기준의 Date 객체
 */
export function getKoreanTime(date: Date = new Date()): Date {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000)
}

/**
 * date 해당주의 시작일 (일요일부터 시작)
 * @return yyyy-MM-dd
 */
export function getWeekKey(date: Date) {
  return format(startOfWeek(date, { weekStartsOn: 0 }), 'yyyy-MM-dd')
}
