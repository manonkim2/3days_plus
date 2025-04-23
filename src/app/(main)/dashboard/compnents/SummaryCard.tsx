import { cn } from '@/utils/cn'
import { PropsWithChildren, ReactElement } from 'react'

interface SummaryCardProps {
  title: string | ReactElement
  isActive?: boolean
  onClick?: () => void
}

const SummaryCard = ({
  title,
  isActive,
  onClick,
  children,
}: PropsWithChildren<SummaryCardProps>) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer flex flex-col justify-between rounded-xl border px-6 py-4 backdrop-blur-md transition-all duration-300 ease-in-out',
        isActive
          ? 'border-white/20 bg-white/10 ring-2 ring-white/20'
          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:ring-1 hover:ring-white/10 hover:shadow-lg hover:scale-[1.01]',
      )}
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

export default SummaryCard
