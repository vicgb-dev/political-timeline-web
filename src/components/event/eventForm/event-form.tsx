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

const schema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título no puede tener más de 100 caracteres'),
  summary: z.string().min(1, 'El resumen es requerido').max(100, 'El resumen no puede tener más de 100 caracteres'),
  date: z.date()
})

export type EventFormData = z.infer<typeof schema>

export function EventForm () {
  const removeEventById = useEvents(state => state.removeEventById)
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    defaultValues: {
      date: new Date()
    },
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
          <Heading size="7" style={{ textDecoration: 'underline' }}>
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
        <Flex className='gap-3'>
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
          <ScrollArea type="hover" className='px-3'>
            <div className="container">
              <div className="TOPIC">
                <ComboSelect<Topic>
                  props={{
                    type: 'Topic',
                    multiSelect: false,
                    buttonTitle: 'Tema del evento'
                  }} />
                {/* <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text> */}

              </div>
              <div className="TITLE">
                <label>Titulo
                  <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  {/* <Text size='1' color='red'>asdasd</Text> */}
                </label>
              </div>
              <div className="DATE">
                <label>Fecha y hora
                  <TextFieldInput {...register('date')} type="date" />
                  <TextFieldInput {...register('date')} type="time" />
                  {/* <Text size='1' color='red'>asdasd</Text> */}
                </label>
              </div>
              <div className="SUMMARY flex flex-col h-full">
                <label htmlFor='event-create-form-summary'>Resumen del evento</label>
                <TextArea id='event-create-form-summary' style={{ flex: 1 }} {...register('summary')} placeholder="Resumen" />
                {/* <Text size='1' color='red'>asdasd</Text> */}
              </div>
              <div className='RELATED flex flex-col gap-5'>
                <Callout.Root variant='surface' className=''>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                  Elige otros recursos para relacionar el evento con ellos. Pueden ser figuras públicas, grupos políticos, eventos o etiquetas. No tienen por qué aparecer en el evento pero sí estar relacionados con él.
                  </Callout.Text>
                </Callout.Root>
              </div>
              <div className="SOURCES">
                <label className='w-full'>Fuentes
                  <div className='flex flex-row w-full items-center'>
                    <TextFieldInput {...register('title')} placeholder="Titulo" className='w-full' />
                    <IconButton variant='outline' size='2' className='relative w-full'>
                      <PlusIcon />
                    </IconButton>

                  </div>
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  {/* <Text size='1' color='red'>asdasd</Text> */}
                </label>
              </div>
              <div className="FIGURES">
                <ComboSelect<PublicFigure>
                  props={{
                    type: 'PublicFigure',
                    multiSelect: true,
                    buttonTitle: 'Figura públicas'
                  }} />
                {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
              </div>
              <div className="GROUPS">
                <ComboSelect<Group>
                  props={{
                    type: 'Group',
                    multiSelect: true,
                    buttonTitle: 'Grupos políticos'
                  }} />
                {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
              </div>
              <div className="EVENTS">
                <ComboSelect<PoliticalEvent>
                  props={{
                    type: 'PoliticalEvent',
                    multiSelect: true,
                    buttonTitle: 'Eventos'
                  }} />
                {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
              </div>
              <div className="TAGS">
                <label>Etiquetas (separadas por espacios)
                  <TextFieldInput {...register('title')} placeholder="Titulo"/>
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  {/* <Text size='1' color='red'>asdasd</Text> */}
                </label>
              </div>
            </div>
          </ScrollArea>
          <Grid gap='2'>
            <Flex >
            </Flex>
          </Grid>
        </Form.Root>
      </Flex>
    </Card>
  )
}
