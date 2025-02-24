import Box from '@/components/Box'
import { Button } from '@/components/ui'
import Link from 'next/link'

interface ITaskProps {}

const Task = ({}: ITaskProps) => {
  return (
    <Box
      title={
        <div className="flex justify-between items-center">
          <span className="text-xl">TODAY TASK</span>
          <Link href={'/schedule'}>
            <Button size="sm" variant="outline">
              바로가기
            </Button>
          </Link>
        </div>
      }
    ></Box>
  )
}

export default Task
