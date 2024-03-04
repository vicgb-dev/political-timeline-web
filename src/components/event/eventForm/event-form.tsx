import { Button, Card, Flex, Heading, Text, TextFieldInput, Grid, ScrollArea, TextArea } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import './event-form.css'

const schema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título no puede tener más de 100 caracteres'),
  summary: z.string().min(1, 'El resumen es requerido').max(100, 'El resumen no puede tener más de 100 caracteres'),
  date: z.date()
})

export type EventFormData = z.infer<typeof schema>

export function EventForm () {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    defaultValues: {
      date: new Date()
    },
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<EventFormData> = async (data: EventFormData) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 500)
      })
      console.log(data)
    } catch (error) {
      setError('root', { message: 'Error' })
    }
  }

  return (
    <Card className='efcolor no-border no-top-radius event-card-L' style={{ height: '100%' }}>
      <Flex direction='column' gap='2' style={{ padding: '20px' }} height='100%'>
        <Heading size='2'>Crear evento</Heading>
        <Form.Root onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
          <ScrollArea type="hover" >

            <div className="container">
              <div className="INFO">INFO</div>
              <div className="TITLE">
                <label>Titulo
                  <TextFieldInput {...register('title')} placeholder="Titulo"/>
                  {errors.title && <Text size='1' color='red'>{errors.title?.message}</Text>}
                  <Text size='1' color='red'>asdasd</Text>
                </label>
              </div>
              <div className="DATE">
                <label>Fecha y hora
                  <TextFieldInput {...register('date')} type="date"/>
                  <Text size='1' color='red'>asdasd</Text>
                </label>
              </div>
              <div className="TOPIC">TOPIC</div>
              <div className="SUMMARY" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                <Button disabled={isSubmitting} type="submit">Crear</Button>
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
