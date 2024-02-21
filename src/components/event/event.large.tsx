import { ArchiveIcon, Cross1Icon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { Badge, Button, Card, Flex, Heading, IconButton } from '@radix-ui/themes'
import { PoliticalEvent } from '../../models/event.interface'
import { useContext, useState } from 'react'
import './event.css'
import { EventsContext } from '../../providers/events-context'

interface EventLProps {
  event: PoliticalEvent
  isFloat: boolean
}

export function EventL ({ props }: { props: EventLProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const { focusedEvent, setFocusedEvent } = useContext(EventsContext)

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
  }

  const closeEvent = () => {
    setFocusedEvent(null)
  }

  return (
    <div>
      <Card size="3" >
        {/* Titulo */}
        <Flex gap="3" align="start" direction="column" pb='4'>
          <Heading size="5" style={{ textDecoration: 'underline' }}>
            asdasdasd{ props.event.title }
          </Heading>
          <IconButton onClick={closeEvent}>
            <Cross1Icon />
          </IconButton>
        </Flex>
        {/* Partidos */}
        <Flex gap="2" width='100%' py='2' justify='end' wrap='wrap'>
          <Badge variant='soft' radius='full' color="orange">#In progress</Badge>
          <Badge variant='outline' radius='large' color="blue">In review</Badge>
          <Badge variant='outline' radius='large' color="green">Complete</Badge>
        </Flex>
        {/* Botones */}
        <Flex gap="4" pt='4' align="center">
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
        {/* Desplegable */}
        <div className={`${buttonsExpanded ? 'full-height' : 'no-height'} `}>
          <Flex gap="3" pt='5' align="center" direction="column">
            <Heading size="1" weight="bold">
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el asd asd as asdsd
            </Heading>
          </Flex>
        </div>
      </Card>
    </div>
  )
}
