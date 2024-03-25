import { CounterClockwiseClockIcon, Share1Icon } from '@radix-ui/react-icons'
import { Button, Flex, Popover, Text } from '@radix-ui/themes'
import { useState } from 'react'
import { ToastProps, useToast } from '../../stores/toast-store'
import { notImplementedToastProps } from '../../constants/mocks/not-implemented-toast'

export function PopoverTabsMenu ({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  const addToast = useToast(state => state.addToast)

  function customOpen () {
    setOpen(false)
  }

  function handleClick () {
    const toast: ToastProps = notImplementedToastProps
    addToast(toast, true)
  }

  // TODO: Add functionality to the buttons
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        { children }
      </Popover.Trigger>
      <Popover.Content >
        <Flex direction='column' gap='3' align='start'>
          <Text>Pestañas de eventos</Text>
          <Button
            size='2'
            style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }}
            variant='soft'
            tabIndex={-1}
            onClick={handleClick}>
            <CounterClockwiseClockIcon />
              Historial
          </Button>
          <Button
            size='2'
            style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }}
            variant='soft'
            tabIndex={-1}
            onClick={handleClick}>
            <Share1Icon />
              Compartir todos los eventos
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
