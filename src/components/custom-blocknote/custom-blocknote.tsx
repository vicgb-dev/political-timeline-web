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

export const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    publicFigure: PublicFigure,
    politicalEvent: PoliticalEvent,
    topic: Topic
  }
})

export function CustomBlockNote () {
  const editor = useCreateBlockNote(
    {
      schema,
      initialContent: eventInitialContent,
      placeholders: eventBlockEditorPlaceholders
    }
  )

  return (
    <BlockNoteView
      data-theming-css-variables-demo
      editor={editor}
      slashMenu={false}
      formattingToolbar={false}
      linkToolbar={false}
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
      />
      <SuggestionMenuController
        triggerCharacter={'{'}
        getItems={async (query) =>
          await getEventMenuItems(editor, query)
        }
      />
      <SuggestionMenuController
        triggerCharacter={'['}
        getItems={async (query) =>
          await getTopictMenuItems(editor, query)
        }
      />
    </BlockNoteView>
  )
}
