import Link from 'next/link'
import Box from '@/components/Box'
import Button from '@/components/Button'
import Calender from '@/components/Calender'

import News from '@/components/News'
import { formatDate } from '@/utils/formatDate'
import { getUserInfo } from '@/utils/supabase/actions'

const DashBoardPage = async () => {
  const user = await getUserInfo()

  return (
    <div>
      <div className="my-xxl">
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Hello,</span>
          <span className="text-3xl font-semibold">
            {user?.name || 'Everybody'}
          </span>
        </div>
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Today is</span>
          <span className="text-3xl font-semibold" suppressHydrationWarning>
            {formatDate()}
          </span>
        </div>
      </div>

      <div className="grid gap-8">
        <div className="grid grid-cols-[2fr,1.5fr,3fr] h-[400px] gap-3">
          <Calender />

          <Box>
            <div className="flex justify-between items-center">
              <span className="text-xl">TASK</span>
              <Link href={'/schedule'}>
                <Button text="바로가기" size="sm" variant="secondary" />
              </Link>
            </div>
            {/* <TaskList /> */}
          </Box>

          <Box />
        </div>
        <News />
      </div>
    </div>
  )
}

export default DashBoardPage
