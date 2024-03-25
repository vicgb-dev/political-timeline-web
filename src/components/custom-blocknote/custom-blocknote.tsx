import { eventInitialContent } from './helpers/initial-content'
import { eventBlockEditorPlaceholders } from './helpers/placeholders'
import { getCustomSlashMenuItems } from './helpers/suggestion-items'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { filterSuggestionItems } from '@blocknote/core'
import { BlockNoteView, FormattingToolbarController, LinkToolbar, LinkToolbarController, LinkToolbarProps, SuggestionMenuController, useCreateBlockNote } from '@blocknote/react'
import { getCustomFormattingToolbarItems } from './helpers/formatting-toolbar'
import { CustomLinkToolbar } from './helpers/link-toolbar'

export function CustomBlockNote () {
  const editor = useCreateBlockNote(
    {
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
    </BlockNoteView>
  )
}
