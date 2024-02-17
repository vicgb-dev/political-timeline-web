import { Badge, Box, Button, Card, Flex, Heading, IconButton, Link, Text } from '@radix-ui/themes'
import { Event } from '../../models/event.interface'
import { ArchiveIcon, CalendarIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { ALIGN } from '../../constants/enums'
import './event.css'
import { TopicService } from '../../services/topic-service'

interface EventSProps {
  event: Event
  column: ALIGN
  align: ALIGN
  oneColumn: boolean
}

export function EventS ({ props }: { props: EventSProps }) {
  // const EventS: FC<EventSProps> = ({ event, align }) => {
  // Pinta la linea
  // Decide si mostrar una columna o dos

  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)
  const [topic, setTopic] = useState('')

  const isLeft = props.oneColumn ? props.oneColumn : props.column === ALIGN.LEFT
  const oneColumnClass = props.oneColumn ? 'one-column' : ''
  // const isLeft = true

  useEffect(() => {
    if (!props.event.idTopic) return

    async function readTopic () {
      const readTopic = await TopicService.getTopic(props.event.idTopic!)
      if (readTopic) {
        setTopic(readTopic.title)
      }
    }

    readTopic()
  }, [])

  let cardDisplay: string

  cardDisplay = 'smallScreenLeft'
  if (contentExpanded) {
    cardDisplay = 'fullScreen'
  } else {
    if (isLeft) {
      cardDisplay = 'smallScreenLeft'
    } else {
      cardDisplay = 'smallScreenRight'
    }
  }

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
  }

  const toggleContentExpand = () => {
    setContentExpanded(!contentExpanded)
  }

  const getDate = (date: Date): string => {
    return (new Date(date)).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (// <div className="test-components background6">
    <Box className={`${cardDisplay} event-card-S scrollAnimation ${oneColumnClass}`} >
      {/* Por encima */}
      <Flex gap="3" justify='between' style={{ flexDirection: (isLeft ? 'row' : 'row-reverse') }}>
        <Link size='2' href="" target="_blank">
          { topic }
        </Link>
        <Flex gap="3" justify='end' style={{ marginRight: (isLeft ? '-24px' : '0px'), marginLeft: (isLeft ? '0px' : '-24px'), flexDirection: (isLeft ? 'row' : 'row-reverse') }} >
          <Text size='2' >{ getDate(props.event.eventDate) }</Text>
          <CalendarIcon />
        </Flex>
      </Flex>
      <Card size="3" className={contentExpanded ? 'bg' : 'nobg'}>
        {/* Titulo */}
        <Flex gap="3" align="end" direction="column" pb='4'>
          <Button highContrast color='gray' variant='ghost' size='2' style={{ textAlign: 'end' }} onClick={toggleContentExpand}>
            <Heading size="5" style={{ textDecoration: 'underline' }}>
              { props.event.title }
            </Heading>
          </Button>
        </Flex>
        {/* Contenido */}
        <div className={`${contentExpanded ? 'full-height' : 'no-height'} overflow-clip`}>
          <Heading size="2" style={{ marginBottom: '12px' }}>
            { props.event.description }
          </Heading>
        </div>
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
    </Box>
    // </div>
  )
}
