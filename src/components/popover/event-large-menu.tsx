import { SewingPinFilledIcon, Share1Icon } from '@radix-ui/react-icons'
import { Button, Flex, Popover, Text } from '@radix-ui/themes'
import { useState } from 'react'
import { ToastProps, useToast } from '../../stores/toast-store'

export function PopoverEventLargeMenu ({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)
  const addToast = useToast(state => state.addToast)

  function customOpen () {
    setOpen(false)
  }

  function handleClick () {
    showNotImplementedToast()
  }

  function showNotImplementedToast () {
    const toast: ToastProps = {
      title: 'Not implemented yet',
      description: 'This feature is not implemented yet',
      showButton: false,
      buttonText: '',
      buttonAction: () => { },
      duration: 2000
    }
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
          <Text>Menú de evento</Text>
          <Button
            size='2'
            style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }}
            variant='soft'
            tabIndex={-1}
            onClick={handleClick}>
            <Share1Icon />
              Compartir este evento
          </Button>
          <Button
            size='2'
            style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }}
            variant='soft'
            tabIndex={-1}
            onClick={handleClick}>
            <SewingPinFilledIcon/>
            Buscar evento en timeline
          </Button>

        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
