import { ArchiveIcon, Cross1Icon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { Badge, Text, Card, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { useState } from 'react'
import '../event.css'
import { shuffle } from '../../../tools/array-tools'
import { FakeGroups, getColor } from '../../../constants/mocks/mock-groups'
import { useEvents } from '../../../stores/events-store'
import { useLayoutStore } from '../../../stores/layout-store'
import { PopoverEventLargeMenu } from '../../popover/event-large-menu'
import { ToastProps, useToast } from '../../../stores/toast-store'
import { notImplementedToastProps } from '../../../constants/mocks/not-implemented-toast'

interface EventLProps {
  event: PoliticalEvent
}

export function EventL ({ props }: { props: EventLProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const toggleEvent = useEvents(state => state.toggleEvent)
  const floatEvent = useLayoutStore(state => state.floatEvent)
  const addToast = useToast(state => state.addToast)

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
    showNotImplementedToast()
  }

  const closeEvent = () => {
    toggleEvent(props.event)
  }

  function showNotImplementedToast () {
    const toast: ToastProps = notImplementedToastProps
    addToast(toast, true)
  }

  return (
    <Card size='3' className='h-full event-card-L event-blur efcolor no-border no-top-radius'>
      {/* Titulo */}
      <Flex gap="3" align="center" justify="start" direction="row" pb='4' style={{ paddingRight: 10 }}>
        <Heading size="7" className='underline w-full'>
          {props.event.title}
        </Heading>
        <PopoverEventLargeMenu>
          <IconButton variant='ghost'>
            <DotsVerticalIcon />
          </IconButton>
        </PopoverEventLargeMenu>
        {floatEvent && <IconButton variant='ghost' onClick={closeEvent}>
          <Cross1Icon />
        </IconButton>}
      </Flex>
      <ScrollArea type='hover'>
        <Text className='text-pretty'>
          {props.event.description}
        </Text>
      </ScrollArea>
      {/* Footer */}
      <footer className='event-footer'>
        {/* Botones */}
        <Flex gap="4">
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <DotsVerticalIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <PersonIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <ArchiveIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <DropdownMenuIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <Share1Icon />
          </IconButton>
        </Flex>
        {/* Partidos */}
        <Flex gap="3">
          {
            shuffle(FakeGroups).slice(0, Math.random() * (5)).map((party, index) => (
              <Badge key={index} variant='outline' radius='large' color={getColor(party.color)} >
                {party.name}
              </Badge>
            ))
          }
        </Flex>
      </footer>
      {/* Desplegable */}
      <div hidden className={`${buttonsExpanded ? 'full-height' : 'no-height'} `}>
        <Flex gap="3" pt='5' align="center" direction="column">
          <Heading size="1" weight="bold">
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el asd asd as asdsd
          </Heading>
        </Flex>
      </div>
    </Card>
  )
}
