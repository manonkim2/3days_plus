'use client'

import { useState, useRef, useEffect } from 'react'

interface CustomDropdownProps {
  onUndo: () => void
  onDelete: () => void
  disabled?: boolean
}

const Dropdown = ({
  onUndo,
  onDelete,
  disabled = false,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block z-40" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <span className="text-lg">⋮</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-xs bg-white border rounded shadow z-10">
          <button
            onClick={() => {
              onUndo()
              setOpen(false)
            }}
            className={`block w-full text-left px-4 py-sm text-sm hover:bg-gray-100 ${
              disabled
                ? 'text-fontTertiary cursor-not-allowed'
                : 'text-fontPrimary'
            }`}
            disabled={disabled}
          >
            Undo
          </button>
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Dropdown
