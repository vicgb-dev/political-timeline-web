import { Button, Card, Flex, Heading, Text, TextFieldInput, Grid, ScrollArea, TextArea, Blockquote, Callout, Popover, HoverCard, Link, Avatar, Box } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import './event-form.css'
import { DialogAB } from '../../../shared/dialog/dialog-ab'
import { useEvents } from '../../../stores/events-store'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { ComboSelect } from '../../inputs/combo-select'
import { Topic } from '../../../models/topic.interface'
import { Group } from '../../../models/group.interface'

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
      <Flex gap="3" align="start" justify="between" direction="row" pb='4' >
        <Heading size="7" style={{ textDecoration: 'underline' }}>
          Crear nuevo evento
        </Heading>
        {/* {errors.root && <Text size='1' color='red'>{errors.root?.message}</Text>} */}
        <Flex className='gap-3'>
          <Button variant='soft' disabled={isSubmitting} type="submit">Crear</Button>
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
        </Flex>
      </Flex>
      <Flex direction='column' gap='2' className='h-full pb-8'>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className='h-full pb-6'>
          <ScrollArea type="hover" className='px-3'>
            <div className="container pb-32">
              <div className="INFO flex flex-col gap-5">
                <Callout.Root variant='surface' className='flex flex-row content-center'>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                  Información sobre cómo escribir el evento, normas y principales razones por las que la administración puede rechazar un evento.
                  </Callout.Text>
                </Callout.Root>
                <Callout.Root variant='surface' color='amber' className='flex flex-row content-center'>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                  Información sobre cómo escribir el evento, normas y principales razones por las que la administración puede rechazar un evento.
                  </Callout.Text>
                </Callout.Root>
              </div>
              <div className="TOPIC flex flex-col">
                <Text>Tema del evento</Text>
                <ComboSelect<Topic>
                  props={{
                    multiSelect: false,
                    buttonTitle: 'Elige tema',
                    getTitle: (data: Topic) => data.title,
                    getSubtitle: (data: Topic) => data.article
                  }} />
                {/* <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text> */}

              </div>
              <div className="TITLE">
                <label>Titulo
                  <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text>
                </label>
              </div>
              <div className="DATE">
                <label>Fecha y hora
                  <TextFieldInput {...register('date')} type="date" />
                  <Text size='1' color='red'>asdasd</Text>
                </label>
              </div>
              <div className="SUMMARY flex flex-col h-full">
                <label htmlFor='event-create-form-summary'>Resumen del evento</label>
                <TextArea id='event-create-form-summary' style={{ flex: 1 }} {...register('summary')} placeholder="Resumen" />
                <Text size='1' color='red'>asdasd</Text>
              </div>
              <div className="SOURCES">
                <label>Fuentes
                  <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text>
                </label>
              </div>
              <div className="FIGURES">
                <label>Figuras publicas
                  <ComboSelect<Topic>
                    props={{
                      multiSelect: false,
                      buttonTitle: 'Elige tema',
                      getTitle: (data: Topic) => data.title,
                      getSubtitle: (data: Topic) => data.article
                    }} />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                </label>
              </div>
              <div className="GROUPS">
                <label>Grupos políticos
                  <ComboSelect<Group>
                    props={{
                      multiSelect: false,
                      buttonTitle: 'Elige tema',
                      getTitle: (data: Group) => data.name,
                      getSubtitle: (data: Group) => data.color
                    }} />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                </label>
              </div>
              <div className="EVENTS">
                <label>Eventos relacionados
                  <ComboSelect<Topic>
                    props={{
                      multiSelect: false,
                      buttonTitle: 'Elige tema',
                      getTitle: (data: Topic) => data.title,
                      getSubtitle: (data: Topic) => data.article
                    }} />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                </label>
              </div>
              <div className="TAGS">
                <label>Etiquetas
                  <TextFieldInput {...register('title')} placeholder="Titulo" />
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text>
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
