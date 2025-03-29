'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

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
    <div className="text-4xl font-poppins text-fontTertiary">{displayed}</div>
  )
}

const Title = ({ userName }: { userName?: string }) => {
  const [showDate, setShowDate] = useState(false)

  return (
    <div className="container flex flex-col justify-end mb-xxl h-1/3">
      <div className="flex justify-end">
        <TypingText
          text={`Hello, ${userName || 'Everybody'}`}
          onComplete={() => setShowDate(true)}
        />
      </div>
      {showDate && (
        <div className="flex justify-end">
          <TypingText
            text={`Today is ${format(new Date(), 'EEEE, MMMM do')}`}
          />
        </div>
      )}
    </div>
  )
}

export default Title
