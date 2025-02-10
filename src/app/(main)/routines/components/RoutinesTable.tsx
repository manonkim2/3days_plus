'use client'

import { getDateWithWeek } from '@/utils/formmattedDate'
import { useSelectedWeek } from '../context'
import Box from '@/components/Box'
import { IRoutine } from '../actions'

const RoutinesTable = ({ routinesData }: { routinesData: IRoutine[] }) => {
  const { week } = useSelectedWeek()

  return (
    <Box>
      <div className="flex">
        <div>
          {routinesData.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
        <div className="flex gap-md">
          {week.map((date, index) => (
            <div key={index}>
              <span>{getDateWithWeek(date)}</span>
            </div>
          ))}
        </div>
      </div>
    </Box>
  )
}

export default RoutinesTable
