import Link from 'next/link'
import { format } from 'date-fns'

import Box from '@/components/Box'
import News from '@/app/(main)/dashboard/compnents/News'
import { getUserInfo } from '@/utils/supabase/actions'
import { Button } from '@/components/ui'

const DashBoardPage = async () => {
  const user = await getUserInfo()

  return (
    <div>
      <div className="mb-xxl font-poppins">
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Hello,</span>
          <span className="text-3xl font-semibold">
            {user?.name || 'Everybody'}
          </span>
        </div>
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Today is</span>
          <span className="text-3xl font-semibold" suppressHydrationWarning>
            {format(new Date(), 'EEEE, MMMM do')}
          </span>
        </div>
      </div>

      <div className="grid gap-8">
        <div className="grid grid-cols-[2fr,1.5fr,3fr] h-[400px] gap-3">
          <Box>
            <div className="flex justify-between items-center">
              <span className="text-xl">TASK</span>
              <Link href={'/schedule'}>
                <Button size="sm" variant="secondary">
                  바로가기
                </Button>
              </Link>
            </div>
          </Box>

          <Box />
        </div>
        <News />
      </div>
    </div>
  )
}

export default DashBoardPage
