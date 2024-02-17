import * as RadixToast from '@radix-ui/react-toast'
import './toast-demo.css'
import { FC, useEffect, useRef, useState } from 'react'

export interface ToastDemoProps {
  showToast: boolean,
  duration: number,
    description: string
}

// Enviar true o false en showToast siempre mostrara el toast
const Toast: FC<ToastDemoProps> = ({ showToast, duration, description }: ToastDemoProps) => {
  const [open, setOpen] = useState(showToast)
  const eventDateRef = useRef(new Date())
  const timerRef = useRef(0)

  useEffect(() => {
    setOpen(false)
    setTimeout(() => {
      setOpen(showToast || !showToast)
    }, 100)
  }, [showToast])

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <RadixToast.Provider>
      <RadixToast.Root duration={duration} className="ToastRoot" open={open} onOpenChange={setOpen}>
        <RadixToast.Title className="ToastTitle">Scheduled: Catch up</RadixToast.Title>
        <RadixToast.Description asChild>
          {description}
        </RadixToast.Description>
        <RadixToast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <button className="Button small green">Undo</button>
        </RadixToast.Action>
      </RadixToast.Root>
      <RadixToast.Viewport className="ToastViewport" />
    </RadixToast.Provider>
  )
}

export default Toast
