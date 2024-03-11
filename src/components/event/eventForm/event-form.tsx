import { Button, Card, Flex, Heading, Text, TextFieldInput, Grid, ScrollArea, TextArea } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import './event-form.css'
import { DialogAB } from '../../../shared/dialog/dialog-ab'
import { useEvents } from '../../../stores/events-store'

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
          <ScrollArea type="hover" >

            <div className="container">
              <div className="INFO">INFO</div>
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
              <div className="TOPIC">TOPIC</div>
              <div className="SUMMARY flex flex-col h-full">
                <label htmlFor='event-create-form-summary'>Resumen del evento</label>
                <TextArea id='event-create-form-summary' style={{ flex: 1 }} {...register('summary')} placeholder="Resumen" />
                <Text size='1' color='red'>asdasd</Text>
              </div>
              <div className="SOURCES">SOURCES</div>
              <div className="FIGURES">FIGURES</div>
              <div className="GROUPS">GROUPS</div>
              <div className="EVENTS">EVENTS</div>
              <div className="TAGS">TAGS</div>
              <div className="SUBMIT">
                {errors.root && <Text size='1' color='red'>{errors.root?.message}</Text>}
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
