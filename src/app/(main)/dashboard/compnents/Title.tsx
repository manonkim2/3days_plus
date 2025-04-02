'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import TitleImageSheet from './TitleImageSheet'
import { useUser } from '@/context/UserContext'

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

const Title = () => {
  const [showDate, setShowDate] = useState(false)
  const { user } = useUser()

  return (
    <div className="container flex justify-between items-end mb-xxl h-1/3">
      <TitleImageSheet />
      <div className=" flex flex-col items-end">
        <TypingText
          text={`Hello, ${user?.name || 'Everybody'}`}
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
