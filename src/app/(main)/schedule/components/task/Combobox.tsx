'use client'

import { ReactNode, useState } from 'react'
import { ChevronsUpDown, Trash2 } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ICombobox {
  items: { value: string; id: number }[]
  value: { value: string; id: number } | null
  setStateAction: React.Dispatch<
    React.SetStateAction<{ value: string; id: number } | null>
  >
  inputSlot?: ReactNode
  handleDeleteCategory: (id: number) => void
}

const Combobox = ({
  items,
  value,
  setStateAction,
  inputSlot,
  handleDeleteCategory,
}: ICombobox) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (item: { value: string; id: number }) => {
    setStateAction(item)
    setOpen(false)
  }

  return (
    <div className="relative inline-block w-[150px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 border rounded bg-white text-sm"
      >
        {value?.value || 'Select category'}
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div>
          {inputSlot}
          <ul className="absolute left-0 z-10 w-full border rounded bg-white shadow-md text-sm max-h-48 overflow-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full justify-between px-md"
              >
                <li
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'py-sm cursor-pointer hover:bg-gray-100',
                    value?.id === item.id && 'bg-gray-100 font-semibold',
                  )}
                >
                  {item.value}
                </li>
                <div
                  onClick={() => handleDeleteCategory(item.id)}
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 opacity-50" />
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Combobox
