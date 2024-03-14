import { Button, Card, Flex, Heading, Text, TextFieldInput, Grid, ScrollArea, TextArea, Callout, Popover, IconButton } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import { DialogAB } from '../../../shared/dialog/dialog-ab'
import { useEvents } from '../../../stores/events-store'
import { InfoCircledIcon, PlusCircledIcon, PlusIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { ComboSelect } from '../../inputs/combo-select'
import { Topic } from '../../../models/topic.interface'
import { Group } from '../../../models/group.interface'
import { PublicFigure } from '../../../models/public-figure.interface'
import { PoliticalEvent } from '../../../models/political-event.interface'
import './event-form.css'
import { AllowedTypesEnum } from '../../../types/allowed-types'
import { SourceInputWithListen } from '../../inputs/source-input-with-list'

const schema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título no puede tener más de 100 caracteres'),
  summary: z.string().min(1, 'El resumen es requerido').max(100, 'El resumen no puede tener más de 100 caracteres'),
  date: z.string(),
  time: z.string()
})

export type EventFormData = z.infer<typeof schema>

export function EventForm () {
  const removeEventById = useEvents(state => state.removeEventById)
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    // defaultValues: {
    //   date: new Date()
    // },
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<EventFormData> = async (data: EventFormData) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    } catch (error) {
      setError('root', { message: 'Error' })
    }
  }

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
          <Button variant='soft' disabled={isSubmitting} type="submit">Crear</Button>
        </Flex>
      </Flex>
      <Flex direction='column' gap='2' className='h-full pb-10'>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='h-full pb-10'>
          <ScrollArea type="hover">
            <div className="container">
              <div className="TOPIC">
                <ComboSelect<Topic>
                  props={{
                    type: AllowedTypesEnum.Topic,
                    multiSelect: false,
                    buttonTitle: 'Tema del evento'
                  }} />
              </div>
              <div className="DATE">
                <label className='flex flex-col gap-2'>Fecha y hora
                  <TextFieldInput {...register('date')} type="date" />
                  <TextFieldInput {...register('time')} type="time" />
                  {errors.date && <Text size='1' color='red'>{errors.date?.message}</Text>}
                </label>
              </div>
              <div className="TITLE">
                <label>Titulo
                  <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                </label>
              </div>
              <div className="SUMMARY flex flex-col h-full">
                <label htmlFor='event-create-form-summary'>Resumen del evento</label>
                <TextArea id='event-create-form-summary' style={{ flex: 1 }} {...register('summary')} placeholder="Resumen" />
                {errors.summary && <Text size='1' color='red'>{errors.summary?.message}</Text>}
              </div>
              <div className='RELATED flex flex-col gap-5'>
                <Callout.Root variant='surface' className=''>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    <ul>
                      <li>Los recursos relacionados con el evento no tienen por qué aparecer en él, pero sí estar relacionados con él.</li>
                      <li>Pueden ser figuras públicas, otros grupos políticos, eventos o etiquetas.</li>
                    </ul>
                  </Callout.Text>
                </Callout.Root>
              </div>
              <div className="SOURCES">
                <SourceInputWithListen />
              </div>
              <div className="FIGURES">
                <ComboSelect<PublicFigure>
                  props={{
                    type: AllowedTypesEnum.PublicFigure,
                    multiSelect: true,
                    buttonTitle: 'Figura públicas'
                  }} />
              </div>
              <div className="GROUPS">
                <ComboSelect<Group>
                  props={{
                    type: AllowedTypesEnum.Group,
                    multiSelect: true,
                    buttonTitle: 'Grupos políticos'
                  }} />
              </div>
              <div className="EVENTS">
                <ComboSelect<PoliticalEvent>
                  props={{
                    type: AllowedTypesEnum.PoliticalEvent,
                    multiSelect: true,
                    buttonTitle: 'Eventos'
                  }} />
              </div>
              <div className="TAGS  pb-52">
                <label>Etiquetas (separadas por espacios)
                  <TextFieldInput placeholder="Etiquetas..."/>
                </label>
              </div>
            </div>
          </ScrollArea>
        </Form.Root>
      </Flex>
    </Card>
  )
}
