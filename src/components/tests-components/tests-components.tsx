import { useRef, useState } from 'react'
import './tests-components.css'
import * as r from '@radix-ui/themes'
import { ArchiveIcon, CalendarIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'

function TestComponent () {
  const [buttonsExpanded, setButtonsExpanded] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)

  const toggleButtonsExpand = () => {
    setButtonsExpanded(!buttonsExpanded)
  }

  const toggleContentExpand = () => {
    setContentExpanded(!contentExpanded)
  }

  return (
    // <div className="test-components background6">
    <r.Box className='event-card-S'>
      {/* Por encima */}
      <r.Flex gap="3" justify='between' >
        <r.Link size='2' href="" target="_blank">
            Nombre del Topic del evento
        </r.Link>
        <r.Flex gap="3" justify='end' style={{ marginRight: '-24px' }} >
          <r.Text size='2' >20/12/2024 2:05AM</r.Text>
          <CalendarIcon />
        </r.Flex>
      </r.Flex>
      <r.Card size="3">
        {/* Titulo */}
        <r.Flex gap="3" align="end" direction="column" pb='4'>
          <r.Button highContrast color='gray' variant='ghost' size='2' style={{ textAlign: 'end' }} onClick={toggleContentExpand}>
            <r.Heading size="5" style={{ textDecoration: 'underline' }}>
                Este es el título del evento
            </r.Heading>
          </r.Button>
        </r.Flex>
        {/* Contenido */}
        <div className={`${contentExpanded ? 'full-height' : 'no-height'} overflow-clip`}>
          <r.Heading size="2" style={{ marginBottom: '12px' }}>
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el evento
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el evento
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el evento
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el evento
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el evento
          </r.Heading>
        </div>
        {/* Partidos */}
        <r.Flex gap="2" width='100%' py='2' justify='end' wrap='wrap'>
          <r.Badge variant='soft' radius='full' color="orange">#In progress</r.Badge>
          <r.Badge variant='outline' radius='large' color="blue">In review</r.Badge>
          <r.Badge variant='outline' radius='large' color="green">Complete</r.Badge>
        </r.Flex>
        {/* Botones */}
        <r.Flex gap="4" pt='4' align="center">
          <r.IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <DotsVerticalIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <PersonIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <ArchiveIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <DropdownMenuIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleButtonsExpand}>
            <Share1Icon />
          </r.IconButton>
        </r.Flex>
        {/* Desplegable */}
        <div className={`${buttonsExpanded ? 'full-height' : 'no-height'} `}>
          <r.Flex gap="3" pt='5' align="center" direction="column">
            <r.Heading size="1" weight="bold">
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el asd asd as asdsd
            </r.Heading>
          </r.Flex>
        </div>
      </r.Card>
    </r.Box>
    // </div>
  )
}

export default TestComponent
