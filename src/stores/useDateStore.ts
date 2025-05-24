import { create } from 'zustand'
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

interface IDateState {
  date: Date
  week: Date[]
  setDate: (newDate: Date) => void
}

export const useDateStore = create<IDateState>((set) => {
  const today = new Date()

  return {
    date: today,
    week: eachDayOfInterval({
      start: startOfWeek(today),
      end: endOfWeek(today),
    }),
    setDate: (newDate: Date) =>
      set({
        date: newDate,
        week: eachDayOfInterval({
          start: startOfWeek(newDate),
          end: endOfWeek(newDate),
        }),
      }),
  }
})
