import React, { useRef, useState } from 'react'
import './tests-components.css'
import * as r from '@radix-ui/themes'
import { ArchiveIcon, DotsVerticalIcon, DropdownMenuIcon, MagnifyingGlassIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'

function TestComponent () {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null) // Añade el tipo de referencia aquí

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const getContentHeight = () => {
    return expanded ? contentRef.current!.scrollHeight + 'px' : '0'
  }

  return (
    // <div className="test-components background6">
    <r.Box className='event-card-S'>
      {/* Por encima */}
      <r.Flex gap="3" justify='between' >
        <r.Link size='2' href="" target="_blank">
            Nombre del Topic del evento
        </r.Link>
        <r.Text size='2' >20/12/2024 2:05AM</r.Text>
      </r.Flex>
      <r.Card size="3">
        {/* Titulo */}
        <r.Flex gap="3" align="end" direction="column" pb='4'>
          <r.Button variant='ghost' size='2'>
            <r.Heading size="5" weight="bold">
                Este es el título del evento
            </r.Heading>
          </r.Button>
        </r.Flex>
        {/* Partidos */}
        <r.Flex gap="2" width='100%' py='2' justify='end' wrap='wrap'>
          <r.Badge variant='soft' radius='full' color="orange">#In progress</r.Badge>
          <r.Badge variant='outline' radius='large' color="blue">In review</r.Badge>
          <r.Badge variant='outline' radius='large' color="green">Complete</r.Badge>
        </r.Flex>
        {/* Botones */}
        <r.Flex gap="4" pt='4' align="center">
          <r.IconButton variant='ghost' size='2' onClick={toggleExpand}>
            <DotsVerticalIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleExpand}>
            <PersonIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleExpand}>
            <ArchiveIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleExpand}>
            <DropdownMenuIcon />
          </r.IconButton>
          <r.IconButton variant='ghost' size='2' onClick={toggleExpand}>
            <Share1Icon />
          </r.IconButton>
        </r.Flex>
        {/* Desplegable */}
        {expanded && (<r.Flex gap="3" pt='4' align="center" direction="column">
          <r.Heading size="2" weight="bold">
            Personajes públicos mencionados en el evento: Personajes públicos mencionados en el asd asd as asdsd
          </r.Heading>
        </r.Flex>)}
      </r.Card>
    </r.Box>
    // </div>
  )
}

export default TestComponent
