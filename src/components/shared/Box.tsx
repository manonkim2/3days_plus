'use client'

import React, { PropsWithChildren, ReactElement } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { cn } from '@/utils/cn'

interface IBoxProps {
  title?: string | ReactElement
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
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">{children}</CardContent>

      {footer && <CardFooter className="flex-col text-sm">{footer}</CardFooter>}
    </Card>
  )
}

export default Box
