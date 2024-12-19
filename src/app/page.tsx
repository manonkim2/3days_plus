import Box from '@/components/Box'
import Button from '@/components/Button'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="mt-16 mb-7">
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Hello,</span>
          <span className="text-3xl font-semibold">Manon</span>
        </div>
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Today is</span>
          <span className="text-3xl font-semibold">{formatDate()}</span>
        </div>
      </div>

      <div className="grid grid-cols-[2fr,1.5fr,3fr] h-[400px] gap-3">
        <Box />
        <Box />
        <Box />
      </div>

      {/* news btn */}
      <div className="flex gap-3 justify-center my-8">
        <Button text="All" variant="secondary" />
        <Button text="business" variant="secondary" />
        <Button text="Entertainment" variant="secondary" />
        <Button text="Science" variant="secondary" />
        <Button text="Technology" variant="secondary" />
      </div>

      {/* news */}
      <div className="grid grid-cols-[2fr,3fr] gap-3 h-[740px]">
        <Box color="secondary">
          <span>Top Stories</span>
          <div className="border">img</div>
          <span>2024. 12. 19</span>
        </Box>
        <div className="grid grid-cols-2 gap-3">
          <Box></Box>
          <Box />
          <Box />
          <Box />
        </div>
      </div>

      <div className="flex justify-center my-8">
        <Button text="more" variant="secondary" />
      </div>
    </div>
  )
}
