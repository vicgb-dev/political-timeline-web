import { Badge, Box, Button, Card, Flex, Heading, IconButton, Link, Text } from '@radix-ui/themes'
import { ArchiveIcon, CalendarIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import '../event.css'

export function EventSSkeleton () {
// const EventS: FC<EventSProps> = ({ event, align }) => {
  // Pinta la linea
  // Decide si mostrar una columna o dos

  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
  }

  const toggleContentExpand = () => {
    setContentExpanded(!contentExpanded)
  }

  return (// <div className="test-components background6">
    <Box className='event-card-S skeleton-container fade-in visible'>
      {/* Por encima */}
      <Flex gap="3" justify='between'className='skeleton-container' >
        <Link size='2' href="" target="_blank" className='skeleton-container'>
        </Link>
        <Flex gap="3" justify='end' className='transparent' >
          <Text size='2' className='transparent'>asd</Text>
          <CalendarIcon className='transparent'/>
        </Flex>
      </Flex>
      <Card size="3" className={(contentExpanded ? 'bg skeleton-container' : 'nobg skeleton-container')}>
        {/* Titulo */}
        <Flex gap="3" align="end" direction="column" pb='4' className='skeleton-container'>
          <Button highContrast color='gray' variant='ghost' size='2' style={{ textAlign: 'end' }} onClick={toggleContentExpand} className='transparent'>
            <Heading size="5" style={{ textDecoration: 'underline' }} className='transparent'>
              asd
            </Heading>
          </Button>
        </Flex>
        {/* Contenido */}
        <div className={`'transparent' ${contentExpanded ? 'full-height' : 'no-height'} overflow-clip`}>
          <Heading size="2" style={{ marginBottom: '12px' }} className='transparent'>
            asd
          </Heading>
        </div>
        {/* Partidos */}
        <Flex gap="2" width='100%' py='2' justify='end' wrap='wrap' className='transparent'>
          <Badge className='transparent' variant='outline' radius='large' color="gray">#In progress</Badge>
          <Badge className='transparent' variant='outline' radius='large' color="gray">In review</Badge>
          <Badge className='transparent' variant='outline' radius='large' color="gray">Complete</Badge>
        </Flex>
        {/* Botones */}
        <Flex gap="4" pt='4' align="center" className='transparent'>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand} className='skeleton-container'>
            <DotsVerticalIcon className='transparent' />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand} className='skeleton-container'>
            <PersonIcon className='transparent' />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand} className='skeleton-container'>
            <ArchiveIcon className='transparent' />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand} className='skeleton-container'>
            <DropdownMenuIcon className='transparent' />
          </IconButton>
          <IconButton variant='ghost' size='2' onClick={toggleButtonsExpand} className='skeleton-container'>
            <Share1Icon className='transparent' />
          </IconButton>
        </Flex>
        {/* Desplegable */}
        <div className={`'transparent' ${buttonsExpanded ? 'full-height' : 'no-height'} `}>
          <Flex gap="3" pt='5' align="center" direction="column" className='transparent'>
            <Heading size="1" weight="bold" className='transparent'>
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el asd asd as asdsd
            </Heading>
          </Flex>
        </div>
      </Card>
    </Box>
    // </div>
  )
}
