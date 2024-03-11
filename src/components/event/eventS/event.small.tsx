import { Badge, Box, Button, Card, Flex, Heading, IconButton, Link, Text } from '@radix-ui/themes'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { ArchiveIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import { ALIGN } from '../../../constants/enums'
import { TopicService } from '../../../services/topic-service'
import { getDate } from '../../../tools/date-tools'
import { CalendarLineEvent } from '../eventsDeco/calendar-line-event'
import { shuffle } from '../../../tools/array-tools'
import { FakeGroups, getColor } from '../../../constants/mocks/mock-groups'
import { useEvents } from '../../../stores/events-store'
import '../event.css'
import { Group } from '../../../models/group.interface'
import { ToastProps, useToast } from '../../../stores/toast-store'

interface EventSProps {
  event: PoliticalEvent
  column: ALIGN
  oneColumn: boolean
}

export function EventS ({ props }: { props: EventSProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [topic, setTopic] = useState('')
  const [parties, setParties] = useState<Group[]>([])
  const selectedEvents = useEvents(state => state.selectedEvents)
  const toggleEvent = useEvents(state => state.toggleEvent)
  const eventRef = useRef<HTMLDivElement>(null)
  const addToast = useToast(state => state.addToast)

  const isLeft = props.oneColumn ? props.oneColumn : props.column === ALIGN.LEFT

  useEffect(() => {
    setParties(shuffle(FakeGroups).slice(0, Math.random() * (5)))
    if (!props.event.idTopic) return

    async function getTopic () {
      const readTopic = await TopicService.getTopic(props.event.idTopic!)
      if (readTopic) {
        setTopic(readTopic.title)
      }
    }

    getTopic()
  }, [])

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
    showNotImplementedToast()
  }

  const focusOnThisEvent = () => {
    // Obtener el nodo DOM de la event seleccionada
    const eventNode = eventRef.current

    // Desplazar el evento seleccionado al centro del viewport
    if (eventNode) {
      setTimeout(() => {
        eventNode.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 10)
    }

    toggleEvent(props.event)
  }

  function showNotImplementedToast () {
    const toast: ToastProps = {
      title: 'Not implemented yet',
      description: 'This feature is not implemented yet',
      showButton: false,
      buttonText: '',
      buttonAction: () => { },
      duration: 1000
    }
    addToast(toast, true)
  }

  return (
    <Box id={`event-${props.event.id}`} ref={eventRef} className={
      `event-card-S 
      ${isLeft ? 'isLeft' : 'isRight'} 
      ${props.oneColumn ? 'one-column' : 'two-columns'}`
    } >
      <CalendarLineEvent props={{ align: isLeft ? ALIGN.LEFT : ALIGN.RIGHT, oneColumn: props.oneColumn }} />
      {/* Por encima */}
      <Flex gap="3" justify='between' style={{ flexDirection: (isLeft ? 'row' : 'row-reverse') }}>
        {/* Topic */}
        <Link size='2' href="" target="_blank" className='text-black'>
          {topic}
        </Link>
        {/* Fecha */}
        <Text size='2'>{getDate(props.event.eventDate)}</Text>
      </Flex>
      <Card size="3" className={`event-blur ${selectedEvents?.find((e) => e.id === props.event.id) ? 'selected' : 'no-selected'}`} >
        {/* Titulo */}
        <Button
          highContrast
          style={{ width: '100%', marginBottom: '5px', cursor: 'pointer' }}
          variant='ghost'
          size='2'
          onClick={focusOnThisEvent}
        >
          <Flex gap="3" align="start" direction="column" width='100%'>
            <Heading size="6">
              {props.event.title}
            </Heading>
            <Text className='short-description'>
              {props.event.summary}
            </Text>
          </Flex>
        </Button>
        {/* Partidos */}
        <Flex gap="2" width='100%' py='2' wrap='wrap'>
          {
            parties.map((party, index) => (
              <Badge key={index} variant='outline' radius='large' color={getColor(party.color)} >
                {party.name}
              </Badge>
            ))
          }
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
    </Box>
    // </div>
  )
}
