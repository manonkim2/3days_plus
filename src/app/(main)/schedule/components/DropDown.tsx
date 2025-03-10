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
  disabled: boolean
}

const DropDown = ({ onClickUndo, onClickDelete, disabled }: IDropDown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={onClickUndo} disabled={disabled}>
          Undo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDown
