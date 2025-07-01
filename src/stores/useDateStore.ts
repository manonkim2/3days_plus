import { create } from 'zustand'
import { endOfWeek, startOfWeek } from 'date-fns'

interface IDateState {
  date: Date
  week: { start: Date; end: Date }
  setDate: (newDate: Date) => void
}

export const useDateStore = create<IDateState>((set) => {
  const today = new Date()

  return {
    date: today,
    week: {
      start: startOfWeek(today),
      end: endOfWeek(today),
    },
    setDate: (newDate: Date) =>
      set({
        date: newDate,
        week: {
          start: startOfWeek(newDate),
          end: endOfWeek(newDate),
        },
      }),
  }
})
