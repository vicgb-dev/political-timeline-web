import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Flex, ScrollArea } from '@radix-ui/themes'
import * as Form from '@radix-ui/react-form'
import { ComboSelect } from '../../inputs/combo-select'
import { PublicFigure } from '../../../models/public-figure.interface'
import { Group } from '../../../models/group.interface'
import { PoliticalEvent } from '../../../models/political-event.interface'
import { AllowedTypesEnum } from '../../../types/allowed-types'
import { CustomBlockNote } from '../../custom-blocknote/custom-blocknote'

interface ArticleProps {
  article: any[]
  setArticle: (blocks: any[]) => void
  addPublicFigure: (publicFigure: PublicFigure) => void
}

export function EventFormArticle ({ props }: { props: ArticleProps }) {
  return (
    <Flex direction='column' gap='2' className='h-full pb-10'>
      <Form.Root className='h-full pb-10'>
        <ScrollArea type="hover">
          <div className="container-article">
            <div className="ARTICLE flex flex-col h-full">
              {/* <label htmlFor='event-create-form-article'>Artículo</label> */}
              {/* <TextArea id='event-create-form-article' style={{ flex: 1 }} placeholder="Artículo..." /> */}
              <Callout.Root variant='surface' className='mb-5'>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  {`"@" para figuras públicas, "{" para eventos, "[" para temas, "|" para grupos`}
                </Callout.Text>
              </Callout.Root>
              <CustomBlockNote props={{
                initialValue: props.article || [],
                returnBlocks: props.setArticle,
                addPublicFigure: props.addPublicFigure }} />
            </div>
          </div>
        </ScrollArea>
      </Form.Root>
    </Flex>
  )
}
