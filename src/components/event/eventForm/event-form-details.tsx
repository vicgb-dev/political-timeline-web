import { Flex, ScrollArea, TextFieldInput, Text, Callout, TextArea } from '@radix-ui/themes'
import { ComboSelect } from '../../inputs/combo-select'
import { Topic } from '../../../models/topic.interface'
import { AllowedTypesEnum } from '../../../types/allowed-types'
import { Group } from '../../../models/group.interface'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { PublicFigure } from '../../../models/public-figure.interface'
import { SourceInputWithListen } from '../../inputs/source-input-with-list'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título no puede tener más de 100 caracteres'),
  summary: z.string().min(1, 'El resumen es requerido').max(100, 'El resumen no puede tener más de 100 caracteres'),
  date: z.string(),
  time: z.string()
})

export type EventFormData = z.infer<typeof schema>

export function EventFormDetails () {
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
            <div className="SOURCES">
              <SourceInputWithListen />
            </div>
            <div className="TAGS pb-9">
              <label>Etiquetas (separadas por espacios)
                <TextFieldInput placeholder="Etiquetas..."/>
              </label>
            </div>
          </div>
        </ScrollArea>
      </Form.Root>
    </Flex>
  )
}
