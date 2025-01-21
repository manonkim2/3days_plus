import News from '../components/News'
import Calender from '../components/Calender'
import Task from '../components/Task'
import Box from '@/components/Box'
import { getUserInfo } from '@/utils/supabase/actions'
import { formatDate } from '@/utils/formatDate'

const DashBoardPage = async () => {
  const user = await getUserInfo()

  return (
    <div>
      <div className="my-xxl">
        <div className="flex justify-end">
          <span className="text-3xl font-extralight pr-2">Hello,</span>
          <span className="text-3xl font-semibold">
            {user?.user_metadata.full_name || 'Everybody'}
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
          <Task />
          <Box />
        </div>
        <News />
      </div>
    </div>
  )
}

export default DashBoardPage
