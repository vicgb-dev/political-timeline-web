import { ArchiveIcon, Cross1Icon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { Badge, Text, Card, Flex, Heading, IconButton, ScrollArea } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { useContext, useState } from 'react'
import { EventsContext } from '../../../context/events-context'
import '../event.css'

interface EventLProps {
  event: PoliticalEvent
}

export function EventL ({ props }: { props: EventLProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const { removeBigEvent } = useContext(EventsContext)

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
  }

  const closeEvent = () => {
    removeBigEvent(props.event)
  }

  return (
    <Card size='3' style={{ height: '100%' }} className='event-card-L event-blur efcolor no-border no-top-radius'>
      {/* Titulo */}
      <Flex gap="3" align="start" justify="between" direction="row" pb='4' >
        <Heading size="7" style={{ textDecoration: 'underline' }}>
          { props.event.title }
        </Heading>
        <IconButton onClick={closeEvent}>
          <Cross1Icon />
        </IconButton>
      </Flex>
      <ScrollArea type='hover'>
        <Text>
          { props.event.description }
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
          <Badge variant='soft' radius='full' color="orange">#In progress</Badge>
          <Badge variant='outline' radius='large' color="blue">In review</Badge>
          <Badge variant='outline' radius='large' color="green">Complete</Badge>
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
