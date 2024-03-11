import * as RadixToast from '@radix-ui/react-toast'
import { useEffect, useState } from 'react'
import './toast-demo.css'
import { ToastProps, useToast } from '../stores/toast-store'
import { Button, Heading, Text } from '@radix-ui/themes'

// Enviar true o false en showToast siempre mostrara el toast
export function ToastService () {
  const toasts = useToast(state => state.toastQueue)
  const removeFirstToast = useToast(state => state.removeFirstToast)
  const [open, setOpen] = useState(false)
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | undefined>(undefined)
  const [currentToast, setCurrentToast] = useState<ToastProps | undefined>(undefined)

  useEffect(() => {
    if (open) return
    if (toasts.length > 0) {
      setOpen(true)
      if (toasts[0].duration > 0) {
        const timeout = setTimeout(() => {
          setOpen(false)
          removeFirstToast()
        }, toasts[0].showButton ? 10000000 : toasts[0].duration)
        // }, toasts[0].duration)

        setTimeoutRef(timeout)
      }
      setCurrentToast(toasts[0])
    }
  }, [toasts, open])

  function handleClick () {
    currentToast?.buttonAction()
    setOpen(false)
    if (timeoutRef) clearTimeout(timeoutRef)
    setTimeoutRef(undefined)
    removeFirstToast()
  }

  function handleSwipeEnd () {
    setOpen(false)
    if (timeoutRef) clearTimeout(timeoutRef)
    setTimeoutRef(undefined)
    removeFirstToast()
  }

  return (
    <>
      <RadixToast.Provider>
        <RadixToast.Root duration={currentToast?.showButton ? 10000000 : currentToast?.duration} onSwipeEnd={handleSwipeEnd} className="ToastRoot" open={open} onOpenChange={setOpen}>
          <RadixToast.Title className="ToastTitle" asChild>
            <Heading size='2'>
              {currentToast?.title}
            </Heading>
          </RadixToast.Title>
          <RadixToast.Description className="ToastDescription" asChild>
            <Text size='1'>
              {currentToast?.description}
            </Text>
          </RadixToast.Description>
          {currentToast?.showButton
            ? <RadixToast.Action asChild className="ToastAction" altText="Goto schedule to undo">
              <Button className="Button small" onClick={handleClick}>
                {currentToast?.buttonText}
              </Button>
            </RadixToast.Action>
            : null}
        </RadixToast.Root>
        <RadixToast.Viewport className="ToastViewport" />
      </RadixToast.Provider>
    </>
  )
}
