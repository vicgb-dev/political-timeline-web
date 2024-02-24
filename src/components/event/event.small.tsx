import { Badge, Box, Button, Card, Flex, Heading, IconButton, Link, Text } from '@radix-ui/themes'
import { PoliticalEvent } from '../../models/event.interface'
import { ArchiveIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { useContext, useEffect, useState } from 'react'
import { ALIGN } from '../../constants/enums'
import { TopicService } from '../../services/topic-service'
import { EventsContext } from '../../providers/events-context'
import { getDate } from '../../tools/date-tools'
import './event.css'

interface EventSProps {
  event: PoliticalEvent
  column: ALIGN
  align: ALIGN
  oneColumn: boolean
}

export function EventS ({ props }: { props: EventSProps }) {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [topic, setTopic] = useState('')
  const { focusedEvent, setFocusedEvent } = useContext(EventsContext)

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
    setFocusedEvent(props.event)
  }

  return (// <div className="test-components background6">
    <Box className={`event-card-S ${isLeft ? 'isLeft' : 'isRight'} ${props.oneColumn ? '' : 'two-columns-width'}`} >
      {/* Por encima */}
      <Flex gap="3" justify='between' style={{ flexDirection: (isLeft ? 'row' : 'row-reverse') }}>
        {/* Topic */}
        <Link size='2' href="" target="_blank">
          { topic }
        </Link>
        {/* Fecha */}
        <Text size='2' style={{ color: 'white' }} >{ getDate(props.event.eventDate) }</Text>
      </Flex>
      <Card size="3" className={`event-blur ${focusedEvent?.id === props.event.id ? 'selected' : 'no-selected'}`} >
        {/* Titulo */}
        <Flex gap="3" align="start" direction="column" pb='4'>
          <Button highContrast variant='ghost' size='2' onClick={focusOnThisEvent}>
            <Heading size="5" style={{ textDecoration: 'underline' }}>
              { props.event.title }
            </Heading>
          </Button>
        </Flex>
        <p className='short-description'>
          { props.event.summary }
        </p>
        {/* Partidos */}
        <Flex gap="2" width='100%' py='2' wrap='wrap'>
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
    </Box>
    // </div>
  )
}
