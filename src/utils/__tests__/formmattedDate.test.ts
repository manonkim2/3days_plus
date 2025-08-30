import {
  getDate,
  getDateRangeInKST,
  getDateWithWeek,
  getFormattedDate,
  getShortDate,
  getWeekKey,
  getWeekRangeInKST,
} from '../formmattedDate'

describe('formmattedDate utils', () => {
  const sample = new Date('2025-08-30T15:30:00+09:00')

  it('getShortDate', () => {
    expect(getShortDate(sample)).toBe('08/30')
  })

  it('getDate', () => {
    expect(getDate(sample)).toBe('2025-08-30')
  })

  it('getDateWithWeek', () => {
    expect(getDateWithWeek(sample)).toBe('08/30 Sat')
  })

  it('getFormattedDate', () => {
    expect(getFormattedDate('2025-06-26T15:30:00+09:00')).toMatch(
      /^2025-06-26 (오전|오후|AM|PM) /,
    )
    expect(getFormattedDate(undefined)).toBe('')
    expect(getFormattedDate('잘못된날짜')).toBe('날짜 형식 오류')
  })

  it('getWeekKey', () => {
    expect(getWeekKey(new Date('2025-06-26'))).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('getDateRangeInKST', () => {
    const { startUtc, endUtc } = getDateRangeInKST(sample)
    expect(startUtc).toBeInstanceOf(Date)
    expect(endUtc).toBeInstanceOf(Date)
    expect(endUtc.getTime() - startUtc.getTime()).toBe(24 * 60 * 60 * 1000) // 하루 차이
  })

  it('getWeekRangeInKST', () => {
    const { startSunUtc, endSatUtc } = getWeekRangeInKST(sample)
    expect(startSunUtc).toBeInstanceOf(Date)
    expect(endSatUtc).toBeInstanceOf(Date)
    expect(endSatUtc.getTime()).toBeGreaterThan(startSunUtc.getTime())
  })
})
