export const dynamic = 'force-dynamic'

import Title from './compnents/Title'
import News from './compnents/News'
import { getUserInfo } from '@/lib/supabase/actions'
import { fetchDashboardNews } from '@/lib/news'

const DashBoardPage = async () => {
  const user = await getUserInfo()
  const newsCardItems = await fetchDashboardNews()

  return (
    <div>
      <div className="font-poppins h-screen bg-[#1E1E1E]">
        <Title user={user?.name || ''} />
      </div>
      <News newsItems={newsCardItems.slice(0, 10)} />
    </div>
  )
}

export default DashBoardPage
