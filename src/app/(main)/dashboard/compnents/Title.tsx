'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import TitleImageSheet from './TitleImageSheet'

const TypingText = ({
  text,
  onComplete,
}: {
  text: string
  onComplete?: () => void
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
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete, text])

  return (
    <span className="text-4xl font-poppins text-fontTertiary font-extralight">
      {displayed}
    </span>
  )
}

const Title = ({ user }: { user: string }) => {
  const [showDate, setShowDate] = useState(false)

  return (
    <div className="hidden md:flex container justify-between items-end mb-[64px] h-full">
      {/* <TitleImageSheet /> */}
      <div className="flex flex-col items-end w-full">
        <TypingText
          text={`Hello, ${user || 'Everybody'}`}
          onComplete={() => setShowDate(true)}
        />
        {showDate && (
          <TypingText
            text={`Today is ${format(new Date(), 'EEEE, MMMM do')}.`}
          />
        )}
      </div>
    </div>
  )
}

export default Title
