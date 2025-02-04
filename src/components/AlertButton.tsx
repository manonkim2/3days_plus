'use client'

import { Badge } from './ui'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog'

interface IAlertButton {
  buttonText: string
  title: string
  description?: string
  cancelButton?: string
  continueButton?: string
}

const AlertButton = ({
  buttonText,
  title,
  description,
  cancelButton = 'cancel',
  continueButton = 'continue',
}: IAlertButton) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Badge>{buttonText}</Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelButton}</AlertDialogCancel>
            <AlertDialogAction>{continueButton}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AlertButton
