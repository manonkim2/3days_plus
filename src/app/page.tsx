import { formatDate } from '@/utils/formatDate'

export default function Home() {
  return (
    <div className="mt-16 gap-8 ">
      <div className="flex justify-end">
        <span className="text-3xl font-extralight pr-2">Hello,</span>
        <span className="text-3xl font-semibold">Manon</span>
      </div>
      <div className="flex justify-end">
        <span className="text-3xl font-extralight pr-2">Today is</span>
        <span className="text-3xl font-semibold">{formatDate()}</span>
      </div>
    </div>
  )
}
