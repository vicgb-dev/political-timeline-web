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

interface EventSProps {
  event: PoliticalEvent
  column: ALIGN
  oneColumn: boolean
}

export function EventS ({ props }: { props: EventSProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [topic, setTopic] = useState('')
  const selectedEvents = useEvents(state => state.selectedEvents)
  const addEvent = useEvents(state => state.addEvent)
  const addEventAt = useEvents(state => state.addEventAt)
  const focusedEvent = useEvents(state => state.focusedEvent)
  const setFocusedEvent = useEvents(state => state.setFocusedEvent)
  const removeEvent = useEvents(state => state.removeEvent)
  const eventRef = useRef<HTMLDivElement>(null)

  const isLeft = props.oneColumn ? props.oneColumn : props.column === ALIGN.LEFT

  useEffect(() => {
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
  }

  const focusOnThisEvent = () => {
    // Obtener el nodo DOM de la event seleccionada
    const eventNode = eventRef.current

    // Desplazar la event seleccionada al centro del viewport
    if (eventNode) {
      setTimeout(() => {
        eventNode.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 10)
    }

    // Si no hay ningun evento enfocado o estoy creando uno
    if (focusedEvent === null || focusedEvent.id === -1) {
      setFocusedEvent(props.event)
      if (!selectedEvents.find((e) => e.id === props.event.id)) {
        addEvent(props.event)
        return
      }
      return
    }

    // Si ya estoy enfocado en este event, no hago nada
    if (focusedEvent.id === props.event.id) return

    // Si ya esta en eventos, lo enfoco
    if (selectedEvents.find((e) => e.id === props.event.id)) {
      setFocusedEvent(props.event)
      return
    }

    // Si mi foco está en otro evento, quito ese evento, añado este y lo enfoco
    if (focusedEvent.id !== props.event.id) {
      const index = selectedEvents.findIndex(event => event.id === focusedEvent.id)
      if (index !== -1) {
        removeEvent(focusedEvent)
        addEventAt(index, props.event)
        setFocusedEvent(props.event)
      }
    }
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
          style={{ width: '100%', marginBottom: '5px' }}
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
            shuffle(FakeGroups).slice(0, Math.random() * (5)).map((party, index) => (
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
