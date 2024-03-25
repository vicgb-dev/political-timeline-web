import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Flex, ScrollArea } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { ComboSelect } from '../../inputs/combo-select'
import { PublicFigure } from '../../../models/public-figure.interface'
import { Group } from '../../../models/group.interface'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { AllowedTypesEnum } from '../../../types/allowed-types'
import { CustomBlockNote } from '../../custom-blocknote/custom-blocknote'

export function EventFormArticle () {
  return (
    <Flex direction='column' gap='2' className='h-full pb-10'>
      <Form.Root className='h-full pb-10'>
        <ScrollArea type="hover">
          <div className="container-article">
            <div className="ARTICLE flex flex-col h-full">
              {/* <label htmlFor='event-create-form-article'>Artículo</label> */}
              {/* <TextArea id='event-create-form-article' style={{ flex: 1 }} placeholder="Artículo..." /> */}
              <CustomBlockNote />
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
          </div>
        </ScrollArea>
      </Form.Root>
    </Flex>
  )
}
