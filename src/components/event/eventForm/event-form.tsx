import { Button, Card, Flex, Heading, Callout, Popover, IconButton } from '@radix-ui/themes'
import { DialogAB } from '../../../shared/dialog/dialog-ab'
import { useEvents } from '../../../stores/events-store'
import { InfoCircledIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import './event-form.css'
import { useState } from 'react'
import { EventFormDetails } from './event-form-details'
import { EventFormArticle } from './event-form-article'
import { useEventForm } from './event-form-hook'

export function EventForm () {
  const removeEventById = useEvents(state => state.removeEventById)
  const [inDetails, setInDetails] = useState(true)
  const {
    onSubmit,
    article,
    setArticle,
    title,
    setTitle,
    addPublicFigure
  } = useEventForm()

  return (
    <Card size='3' className='h-full efcolor no-border no-top-radius event-card-L'>
      <Flex gap="3" align="start" justify="between" direction="row" pb='4' className='flex-wrap' >
        <Flex className='gap-5'>
          <Heading size="6" style={{ textDecoration: 'underline' }}>
          Crear nuevo evento
          </Heading>
          {/* {errors.root && <Text size='1' color='red'>{errors.root?.message}</Text>} */}
          <Popover.Root>
            <Popover.Trigger>
              <IconButton variant='surface' size='2' className='relative' >
                <InfoCircledIcon />
                <TriangleDownIcon className='absolute ml-12' />
              </IconButton>
            </Popover.Trigger>
            <Popover.Content >
              <Callout.Root variant='surface' className='flex flex-row content-center'>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Información sobre cómo escribir el evento, normas y principales razones por las que la administración puede rechazar un evento.
                </Callout.Text>
              </Callout.Root>
            </Popover.Content>
          </Popover.Root>
          <Popover.Root>
            <Popover.Trigger>
              <IconButton variant='surface' color='amber' size='2' className='relative' >
                <InfoCircledIcon />
                <TriangleDownIcon className='absolute ml-12' />
              </IconButton>
            </Popover.Trigger>
            <Popover.Content >
              <Callout.Root variant='surface' color='amber' className='flex flex-row content-center'>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Información sobre cómo escribir el evento, normas y principales razones por las que la administración puede rechazar un evento.
                </Callout.Text>
              </Callout.Root>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        <Flex className='gap-3 flex-1 justify-end items-end'>
          <div className='flex-1'/>
          <DialogAB props={{
            title: 'Dejar de editar',
            description: '¿Estás seguro de que quieres dejar de editar? Los cambios no guardados se perderán.',
            btnGrayText: 'Seguir editando',
            btnGrayAction: () => { },
            btnColorText: 'Dejar de editar',
            btnColorAction: () => { removeEventById(-1) }
          }}>
            <Button variant='soft' color='tomato' size='2'>Cancelar</Button>
          </DialogAB>
          <Button variant='soft' type="submit" onClick={ onSubmit }>Crear</Button>
          <Button variant='soft' onClick={() => setInDetails(!inDetails)}>{inDetails ? 'Editar artículo' : 'Editar detalles'}</Button>
        </Flex>
      </Flex>
      {inDetails
        ? <EventFormDetails props={{ title: title || '', setTitle }} />
        : <EventFormArticle props={{
          article: article || [],
          setArticle,
          addPublicFigure
        }} /> }
    </Card>
  )
}
