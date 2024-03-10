import { CounterClockwiseClockIcon, Share1Icon } from '@radix-ui/react-icons'
import { Button, Flex, Popover } from '@radix-ui/themes'
import { useState } from 'react'

export function PopoverTabsMenu ({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)

  function customOpen () {
    setOpen(false)
  }

  // TODO: Add functionality to the buttons
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        { children }
      </Popover.Trigger>
      <Popover.Content >
        <Flex direction='column' gap='3' align='start'>
          <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft' tabIndex={-1}>
            <CounterClockwiseClockIcon />
              Historial
          </Button>
          <Button size='2'style={{ width: '100%', justifyContent: 'start', cursor: 'pointer' }} variant='soft' tabIndex={-1}>
            <Share1Icon />
              Compartir todos los eventos
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}
