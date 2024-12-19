import { PropsWithChildren } from 'react'

interface IBoxProps {
  color?: 'primary' | 'secondary'
}

const Box = ({ color, children, ...rest }: PropsWithChildren<IBoxProps>) => {
  return (
    <div
      className={`rounded-3xl border-white border-2 w-full h-full p-6 bg-${color}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Box
