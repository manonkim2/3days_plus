'use client'

import { useState } from 'react'
import { ChevronsUpDown, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ICombobox {
  items: { value: string; id: number }[]
  value: { value: string; id: number } | null
  setStateAction: React.Dispatch<
    React.SetStateAction<{ value: string; id: number } | null>
  >
  formAction: (payload: FormData) => void
  handleDeleteCategory: (id: number) => void
}

const Combobox = ({
  items,
  value,
  setStateAction,
  handleDeleteCategory,
  formAction,
}: ICombobox) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('category', inputValue)
    formAction(formData)
    setInputValue('')
  }

  const handleSelect = (item: { value: string; id: number }) => {
    setStateAction(item)
    setOpen(false)
  }

  const InputSlot = () => (
    <form className="relative" action={formAction}>
      <input
        className={cn(
          'flex h-9 w-full rounded-md border-input bg-transparent px-md py-sm text-sm shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        )}
        onKeyDown={() => handleSubmit}
        type="text"
        id="content"
        name="content"
        placeholder="Add category"
      />

      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 transition-opacity disabled:opacity-50"
        onClick={() => handleSubmit}
      >
        <Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </form>
  )

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
        <div className="border bg-white absolute left-0 z-10 ">
          {InputSlot()}
          <ul className="w-full text-sm max-h-48 overflow-auto bg-white border">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full justify-between px-md hover:bg-gray-100 cursor-pointer"
              >
                <li
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'py-sm w-full',
                    value?.id === item.id && 'font-semibold',
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
