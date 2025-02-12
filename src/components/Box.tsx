'use client'

import React, { PropsWithChildren } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { cn } from '@/utils/cn'

interface IBoxProps {
  title?: string
  description?: string
  footer?: React.ReactNode
  className?: string
}

const Box = ({
  title,
  description,
  footer,
  className,
  children,
}: PropsWithChildren<IBoxProps>) => {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 pb-0">{children}</CardContent>

      {footer && (
        <CardFooter className="flex-col gap-sm text-sm">{footer}</CardFooter>
      )}
    </Card>
  )
}

export default Box
