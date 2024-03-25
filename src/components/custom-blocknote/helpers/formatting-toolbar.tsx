import { BlockTypeSelect, CreateLinkButton, FormattingToolbar, FormattingToolbarProps } from '@blocknote/react'
import { ReactElement } from 'react'
import { h1Icon, h2Icon, h3Icon, pIcon } from '../../../constants/icons/blocknote-toolbar-icons'
import { BoldTextStyleButton } from '../toolbar-buttons/bold-button'
import { ItalicTextStyleButton } from '../toolbar-buttons/italic-button'
import { UnderlineTextStyleButton } from '../toolbar-buttons/underline-button'
import { StrikelineTextStyleButton } from '../toolbar-buttons/strikeline-button'
import { CustomNestBlockButton, CustomUnnestBlockButton } from '../toolbar-buttons/nest-buttons'
import { RiListOrdered, RiListUnordered } from 'react-icons/ri'
import { CustomCreateLinkButton } from '../toolbar-buttons/link-button'
export function getCustomFormattingToolbarItems (): ReactElement<FormattingToolbarProps> {
  return (

    <FormattingToolbar>
      <BlockTypeSelect
        items={
          [
            {
              name: 'Párrafo',
              type: 'paragraph',
              icon: pIcon,
              isSelected: (block) => block.type === 'paragraph'
            },
            {
              name: 'Título H1',
              type: 'heading',
              props: { level: 1 },
              icon: h1Icon,
              isSelected: (block) => block.type === 'heading' && block.props.level === 1
            },
            {
              name: 'Título H2',
              type: 'heading',
              props: { level: 2 },
              icon: h2Icon,
              isSelected: (block) => block.type === 'heading' && block.props.level === 2
            },
            {
              name: 'Título H3',
              type: 'heading',
              props: { level: 3 },
              icon: h3Icon,
              isSelected: (block) => block.type === 'heading' && block.props.level === 3
            },
            {
              name: 'Lista',
              type: 'bulletListItem',
              props: { ordered: false },
              icon: RiListUnordered,
              isSelected: (block) => block.type === 'bulletListItem'
            },
            {
              name: 'Lista numerada',
              type: 'numberedListItem',
              props: { ordered: true },
              icon: RiListOrdered,
              isSelected: (block) => block.type === 'numberedListItem'
            }
          ]
        }
        key={'blockTypeSelect'}/>

      <BoldTextStyleButton key={'boldStyleButton'}/>
      <ItalicTextStyleButton key={'boldStyleButton'}/>
      <UnderlineTextStyleButton key={'boldStyleButton'}/>
      <StrikelineTextStyleButton key={'boldStyleButton'}/>

      <CustomNestBlockButton key={'nestBlockButton'} />
      <CustomUnnestBlockButton key={'nestBlockButton'} />

      <CustomCreateLinkButton key={'createLinkButton'} />
    </FormattingToolbar>
  )
}
