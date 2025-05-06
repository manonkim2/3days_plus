'use client'

import { cn } from '@/utils/cn'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getPinnedQuote, IQuotes, upsertPinnedQuote } from '../../actions'

interface IRoutineDetail {
  quotes: IQuotes[]
}

const MotivationDetail = ({ quotes }: IRoutineDetail) => {
  const { data: pinnedQuote, refetch } = useQuery({
    queryKey: ['pinned-quote'],
    queryFn: getPinnedQuote,
  })

  const handleToggleQuote = async (quoteId: number) => {
    if (pinnedQuote?.quoteId !== quoteId) {
      await upsertPinnedQuote(quoteId)
      await refetch()
    }
  }

  const pinned = quotes.find((q) => q.id === pinnedQuote?.quoteId)
  const others = quotes.filter((q) => q.id !== pinnedQuote?.quoteId)

  return (
    <div className="flex flex-col gap-md overflow-hidden h-full">
      <h2 className="text-xl text-fontTertiary">
        Pick Your Favorite Quote for the Day
      </h2>
      <div className="flex flex-col gap-sm overflow-y-scroll">
        <AnimatePresence mode="popLayout">
          {pinned && (
            <motion.div
              key={pinned.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <RoutineCard
                quote={pinned}
                completed={true}
                handleToggleQuote={handleToggleQuote}
              />
            </motion.div>
          )}

          {others.map((quote) => (
            <motion.div
              key={quote.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <RoutineCard
                quote={quote}
                completed={false}
                handleToggleQuote={handleToggleQuote}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

const RoutineCard = ({
  quote,
  completed,
  handleToggleQuote,
}: {
  quote: IQuotes
  completed: boolean
  handleToggleQuote: (quoteId: number) => void
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border px-4 py-3 text-sm transition-shadow',
        completed
          ? 'bg-green-600/10 border-green-500'
          : 'bg-white/5 border-white/10',
      )}
      onClick={() => handleToggleQuote(quote.id)}
    >
      <span className="flex items-center gap-2 cursor-pointer">
        <span>{completed ? '📌' : '⬜'}</span>
        <span className="text-fontTertiary">{quote.content}</span>
      </span>
    </div>
  )
}

export default MotivationDetail
