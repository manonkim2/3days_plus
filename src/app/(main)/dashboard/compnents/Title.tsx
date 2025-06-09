'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const TypingText = ({
  text,
  onComplete,
  showDashboard,
}: {
  text: string
  onComplete?: () => void
  showDashboard?: boolean
}) => {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const nextChar = text[prev.length]
        if (nextChar) return prev + nextChar

        clearInterval(interval)
        setTimeout(() => onComplete?.(), 0)
        return prev
      })
    }, 110)

    return () => clearInterval(interval)
  }, [onComplete, text])

  return (
    <span
      className={`text-2xl sm:text-3xl ${
        showDashboard ? 'md:text-4xl' : 'md:text-5xl'
      } font-poppins text-fontTertiary font-extralight transition-all duration-700`}
    >
      {displayed}
    </span>
  )
}

const Title = ({
  user,
  onTypingDone,
  showDashboard,
}: {
  user: string
  onTypingDone?: () => void
  showDashboard: boolean
}) => {
  const [showDate, setShowDate] = useState(false)

  return (
    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden  ${
        showDashboard
          ? 'h-[30vh] sm:h-[40vh] pt-[var(--navbar-height)]'
          : 'h-screen'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <TypingText
          text={`Hello, ${user || 'Everybody'}`}
          onComplete={() => setShowDate(true)}
          showDashboard={showDashboard}
        />
        {showDate && (
          <TypingText
            text={`Today is ${format(new Date(), 'EEEE, MMMM do')}.`}
            onComplete={onTypingDone}
            showDashboard={showDashboard}
          />
        )}
      </div>
    </div>
  )
}

export default Title
