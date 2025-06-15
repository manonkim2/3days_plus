import { PropsWithChildren, ReactElement, ReactNode } from 'react'

interface SummaryCardProps {
  title: string | ReactElement
  detail?: ReactNode
}

const SummaryCard = ({
  title,
  children,
  detail,
}: PropsWithChildren<SummaryCardProps>) => {
  return (
    <div
      className={
        'group relative min-h-[20vh] sm:h-full cursor-pointer flex flex-col justify-between rounded-xl border px-6 py-4 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden border-white/10 bg-white/5'
      }
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex flex-col justify-end h-full z-10">{children}</div>

      {detail && (
        <div className="absolute inset-0 bg-black/70 opacity-0 translate-y-[90%] group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 px-6 py-4 pointer-events-none group-hover:pointer-events-auto">
          {detail}
        </div>
      )}
    </div>
  )
}

export default SummaryCard
