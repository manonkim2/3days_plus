import React from 'react'
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
  button: React.ReactElement
  alertTitle: string
  description?: string
  cancelButton?: string
  action: () => void
}

const AlertButton = ({
  button,
  alertTitle,
  description,
  cancelButton = 'Cancel',
  action,
}: IAlertButton) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{button}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelButton}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button className="Button red" onClick={action}>
                Continue
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AlertButton
