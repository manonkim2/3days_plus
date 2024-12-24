import { PropsWithChildren } from 'react'

interface IBoxProps {
  color?: 'primary' | 'secondary'
  border?: 'white' | 'black'
}

const Box = ({
  color,
  border = 'white',
  children,
  ...rest
}: PropsWithChildren<IBoxProps>) => {
  return (
    <div
      className={`flex flex-col bg-${color} rounded-3xl border-${border} border-2 w-full h-full p-6`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Box
