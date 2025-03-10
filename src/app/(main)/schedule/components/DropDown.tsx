import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'

interface IDropDown {
  onClickUndo: () => void
  onClickDelete: () => void
}

const DropDown = ({ onClickUndo, onClickDelete }: IDropDown) => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="absolute top-full">
          <DropdownMenuItem onClick={onClickUndo}>Undo</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropDown
