import Box from '@/components/Box'

import News from './components/News'
import Calender from './components/Calender'
import Task from './components/Task'

const DashBoardPage = async () => {
  return (
    <div>
      <div className="grid grid-cols-[2fr,1.5fr,3fr] h-[400px] gap-3">
        <Calender />
        <Task />
        <Box />
      </div>
      <News />
    </div>
  )
}

export default DashBoardPage
