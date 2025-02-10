'use client'

import { getShortDate } from '@/utils/formmattedDate'
import { useSelectedWeek } from '../context'
import Box from '@/components/Box'

const RoutinesTable = () => {
  const { selectedDays, setWeek } = useSelectedWeek()

  return (
    <Box>
      <div>
        {selectedDays.map((date, index) => (
          <div key={index}>
            <span>{getShortDate(date)}</span>
          </div>
        ))}
      </div>
    </Box>
  )
}

export default RoutinesTable
