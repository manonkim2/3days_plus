export const formatKstTime = (date: Date) => {
  const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000)

  return kstTime
}
