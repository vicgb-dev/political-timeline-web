import { DefaultReactSuggestionItem, createReactInlineContentSpec } from '@blocknote/react'
import { schema } from '../custom-blocknote'
import { EventsService } from '../../../services/events-service'

export const PoliticalEvent = createReactInlineContentSpec(
  {
    type: 'politicalEvent',
    propSchema: {
      politicalEvent: {
        default: 'Unknown'
      }
    },
    content: 'none'
  },
  {
    render: (props) => (
      <span className='bg-[color:var(--accent-5)]'>
        e{'{'}{props.inlineContent.props.politicalEvent}{'}'}
      </span>
    )
  }
)

export async function getEventMenuItems (
  editor: typeof schema.BlockNoteEditor,
  query: string
): Promise<DefaultReactSuggestionItem[]> {
  const events = await EventsService.searchEventsWithQuery(query)

  return new Promise((resolve) => {
    resolve(events.map((politicalEvent) => ({
      title: politicalEvent.title,
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
    })))
  })
}
