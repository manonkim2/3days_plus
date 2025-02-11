import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * @returns MM/DD 형식 변환 (예: "02/04")
 */
export function getShortDate(date: Date = new Date()): string {
  return format(date, 'MM/dd')
}

/**
 * @returns MM/DD ccc 형식 변환 (예: "02/04 Mon")
 */
export function getDateWithWeek(date: Date = new Date()): string {
  return format(date, 'MM/dd ccc')
}

/**
 * @returns yyyy년 MM월 dd일 a hh시 mm분
 */
export function getFormattedDate(dateString: string | undefined): string {
  if (!dateString) return ''

  try {
    const parsedDate = new Date(dateString)
    return format(parsedDate, 'yyyy년 MM월 dd일 a hh시 mm분', { locale: ko })
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
