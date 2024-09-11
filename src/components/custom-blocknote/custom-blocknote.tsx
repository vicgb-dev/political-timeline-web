import { eventInitialContent } from './helpers/initial-content'
import { eventBlockEditorPlaceholders } from './helpers/placeholders'
import { getCustomSlashMenuItems } from './helpers/suggestion-items'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteSchema, defaultInlineContentSpecs, filterSuggestionItems } from '@blocknote/core'
import { BlockNoteView, FormattingToolbarController, LinkToolbarController, SuggestionMenuController, useCreateBlockNote } from '@blocknote/react'
import { getCustomFormattingToolbarItems } from './helpers/formatting-toolbar'
import { CustomLinkToolbar } from './helpers/link-toolbar'
import { PublicFigure as InlinePublicFigure } from './custom-inline/inline-public-figure'
import { PoliticalEvent as InlinePoliticalEvent } from './custom-inline/inline-event'
import { Topic as InlineTopic } from './custom-inline/inline-topic'
import { Group as InlineGroup } from './custom-inline/inline-group'
import { useEffect } from 'react'
import { PublicFigureService } from '../../services/public-figure-service'
import { CalendarIcon, DashboardIcon, PersonIcon } from '@radix-ui/react-icons'
import { PublicFigure } from '../../models/public-figure.interface'
import { EventsService } from '../../services/events-service'
import { getDate } from '../../tools/date-tools'
import { TopicService } from '../../services/topic-service'
import { GroupServices } from '../../services/group-services'

interface BlockNoteProps {
  initialValue: any[]
  returnBlocks: (blocks: any[]) => void
  addPublicFigure: (publicFigure: PublicFigure) => void
}

export const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    publicFigure: InlinePublicFigure,
    politicalEvent: InlinePoliticalEvent,
    topic: InlineTopic,
    group: InlineGroup
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
      {/* <div>
        <pre>
          {JSON.stringify(editor.document, null, 2)}
        </pre>
      </div> */}
      <LinkToolbarController linkToolbar={CustomLinkToolbar} />
      <FormattingToolbarController formattingToolbar={getCustomFormattingToolbarItems}/>
      <SuggestionMenuController
        triggerCharacter={'/'}
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        } />
      <SuggestionMenuController
        triggerCharacter={'{'}
        getItems={async (query) => {
          const events = await EventsService.searchEventsWithQuery(query)
          return events.map((politicalEvent) => ({
            title: politicalEvent.title,
            icon: <CalendarIcon />,
            subtext: getDate(politicalEvent.eventDate),
            onItemClick: () => {
              editor.insertInlineContent([
                {
                  type: 'politicalEvent',
                  props: {
                    politicalEvent: politicalEvent.title
                  }
                },
                ' ' // add a space after
              ])
            }
          }))
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'|'}
        getItems={async (query) => {
          const groups = await GroupServices.getGroupsByName(query)
          return groups.map((group) => ({
            title: group.acronym,
            icon: <DashboardIcon />,
            subtext: group.name,
            onItemClick: () => {
              editor.insertInlineContent([
                {
                  type: 'group',
                  props: {
                    group: group.acronym
                  }
                },
                ' ' // add a space after
              ])
            }
          }))
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'@'}
        getItems={async (query) => {
          const publicFigures = await PublicFigureService.getPublicFiguresByName(query)
          return publicFigures.map((publicFigure) => ({
            title: publicFigure.first_name + ' ' + publicFigure.last_name,
            icon: <PersonIcon />,
            subtext: publicFigure.article.substring(0, 50),
            onItemClick: () => {
              props.addPublicFigure(publicFigure)
              editor.insertInlineContent([
                {
                  type: 'publicFigure',
                  props: {
                    publicFigure: publicFigure.first_name + ' ' + publicFigure.last_name,
                    id: publicFigure.id,
                    description: publicFigure.article.substring(0, 50)
                  }
                },
                ' ' // add a space after
              ])
            }
          }))
        }}
      />
      <SuggestionMenuController
        triggerCharacter={'['}
        getItems={async (query) => {
          const topics = await TopicService.getTopicsByTitle(query)
          return topics.map((topic) => ({
            title: topic.title,
            icon: <DashboardIcon />,
            subtext: topic.article.substring(0, 50),
            onItemClick: () => {
              editor.insertInlineContent([
                {
                  type: 'topic',
                  props: {
                    topic: topic.title
                  }
                },
                ' ' // add a space after
              ])
            }
          }))
        }}
      />
    </BlockNoteView>
  )
}
