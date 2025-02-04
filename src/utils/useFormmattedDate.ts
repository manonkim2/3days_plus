import { format } from 'date-fns'

/**
 * @returns 요일 + 월 + 일 형식 변환 (예: "Tuesday, February 4th")
 */
export function getFullDate(date: Date = new Date()): string {
  return format(date, 'EEEE, MMMM do')
}

/**
 * @returns MM/DD 형식 변환 (예: "02/04")
 */
export function getShortDate(date: Date = new Date()): string {
  return format(date, 'MM/dd')
}

/**
 * 주어진 Date 객체를 한국 시간(Asia/Seoul) 기준으로 변환
 * @param date 변환할 UTC Date (기본값: 현재 시간)
 * @returns 한국 시간 기준의 Date 객체
 */
export function getKoreanTime(date: Date = new Date()): Date {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000)
}
