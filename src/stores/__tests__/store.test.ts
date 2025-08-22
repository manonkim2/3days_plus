import { act } from '@testing-library/react'
import { useDateStore } from '../useDateStore'
import { useNewsStore } from '../useNewsStore'
import { startOfWeek, endOfWeek } from 'date-fns'

describe('useDateStore', () => {
  beforeEach(() => {
    useDateStore.setState(useDateStore.getState()) // reset
  })

  it('초기값은 오늘 날짜와 이번 주 범위', () => {
    const { date, week } = useDateStore.getState()
    const today = new Date()
    expect(date.toDateString()).toBe(today.toDateString())
    expect(week.start.toDateString()).toBe(startOfWeek(today).toDateString())
    expect(week.end.toDateString()).toBe(endOfWeek(today).toDateString())
  })

  it('setDate로 날짜와 주간 범위가 업데이트된다', () => {
    const newDate = new Date('2025-01-15')
    act(() => useDateStore.getState().setDate(newDate))
    const { date, week } = useDateStore.getState()
    expect(date.toDateString()).toBe(newDate.toDateString())
    expect(week.start.toDateString()).toBe(startOfWeek(newDate).toDateString())
    expect(week.end.toDateString()).toBe(endOfWeek(newDate).toDateString())
  })
})

describe('useNewsStore', () => {
  beforeEach(() => {
    useNewsStore.setState({ selectedKeyword: null, page: 1 })
  })

  it('초기값은 null 키워드와 page=1', () => {
    const state = useNewsStore.getState()
    expect(state.selectedKeyword).toBeNull()
    expect(state.page).toBe(1)
  })

  it('setPage는 페이지 번호만 변경한다', () => {
    act(() => useNewsStore.getState().setPage(3))
    expect(useNewsStore.getState().page).toBe(3)
  })

  it('setSelectedKeyword는 키워드와 page=1로 리셋한다', () => {
    act(() => useNewsStore.getState().setSelectedKeyword('AI'))
    const state = useNewsStore.getState()
    expect(state.selectedKeyword).toBe('AI')
    expect(state.page).toBe(1)
  })
})
