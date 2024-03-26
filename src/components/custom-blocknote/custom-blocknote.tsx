import { eventInitialContent } from './helpers/initial-content'
import { eventBlockEditorPlaceholders } from './helpers/placeholders'
import { getCustomSlashMenuItems } from './helpers/suggestion-items'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteSchema, defaultInlineContentSpecs, filterSuggestionItems } from '@blocknote/core'
import { BlockNoteView, FormattingToolbarController, LinkToolbarController, SuggestionMenuController, useCreateBlockNote } from '@blocknote/react'
import { getCustomFormattingToolbarItems } from './helpers/formatting-toolbar'
import { CustomLinkToolbar } from './helpers/link-toolbar'
import { PublicFigure, getPublicFigureMenuItems } from './custom-inline/inline-public-figure'
import { PoliticalEvent, getEventMenuItems } from './custom-inline/inline-event'
import { Topic, getTopictMenuItems } from './custom-inline/inline-topic'
import { useEffect } from 'react'
import { Group, getGrouptMenuItems } from './custom-inline/inline-group'

interface BlockNoteProps {
  initialValue: any[]
  returnBlocks: (blocks: any[]) => void
}

export const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    publicFigure: PublicFigure,
    politicalEvent: PoliticalEvent,
    topic: Topic,
    group: Group
  }
})

export function CustomBlockNote ({ props }: { props: BlockNoteProps }) {
  const editor = useCreateBlockNote(
    {
      schema,
      initialContent: props.initialValue.length > 0 ? props.initialValue : eventInitialContent,
      placeholders: eventBlockEditorPlaceholders
    }
  )

  // Cuando el componente se desmonta, se guarda el contenido del editor en el estado del formulario
  useEffect(() => {
    return () => {
      props.returnBlocks(editor.document)
    }
  }, [])

  return (
    <BlockNoteView
      data-theming-css-variables-demo
      editor={editor}
      slashMenu={false}
      formattingToolbar={false}
      linkToolbar={false}
      onChange={() => props.returnBlocks(editor.document)}
    >
      <LinkToolbarController linkToolbar={CustomLinkToolbar} />
      <FormattingToolbarController formattingToolbar={getCustomFormattingToolbarItems}/>
      <SuggestionMenuController
        triggerCharacter={'/'}
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }/>
      <SuggestionMenuController
        triggerCharacter={'@'}
        getItems={async (query) =>
          await getPublicFigureMenuItems(editor, query)
        }
        onItemClick={(item) => {
          console.log(item)
          // TODO: actualizar el estado del formulario
          editor.insertInlineContent([
            {
              type: 'publicFigure',
              props: {
                publicFigure: item.title
              }
            },
            ' '
          ])
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'{'}
        getItems={async (query) =>
          await getEventMenuItems(editor, query)
        }
        onItemClick={(item) => {
          console.log(item)
          // TODO: actualizar el estado del formulario
          editor.insertInlineContent([
            {
              type: 'politicalEvent',
              props: {
                politicalEvent: item.title
              }
            },
            ' '
          ])
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'['}
        getItems={async (query) =>
          await getTopictMenuItems(editor, query)
        }
        onItemClick={(item) => {
          console.log(item)
          // TODO: actualizar el estado del formulario
          editor.insertInlineContent([
            {
              type: 'topic',
              props: {
                topic: item.title
              }
            },
            ' '
          ])
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'|'}
        getItems={async (query) =>
          await getGrouptMenuItems(editor, query)
        }
        onItemClick={(item) => {
          console.log(item)
          // TODO: actualizar el estado del formulario
          editor.insertInlineContent([
            {
              type: 'group',
              props: {
                group: item.title
              }
            },
            ' '
          ])
        }}
      />
    </BlockNoteView>
  )
}
