import { DefaultReactSuggestionItem, createReactInlineContentSpec } from '@blocknote/react'
import { schema } from '../custom-blocknote'
import { TopicService } from '../../../services/topic-service'

export const Topic = createReactInlineContentSpec(
  {
    type: 'topic',
    propSchema: {
      topic: {
        default: 'Unknown'
      }
    },
    content: 'none'
  },
  {
    render: (props) => (
      <span className='bg-[color:var(--accent-5)]'>
        t[{props.inlineContent.props.topic}]
      </span>
    )
  }
)

export async function getTopictMenuItems (
  editor: typeof schema.BlockNoteEditor,
  query: string
): Promise<DefaultReactSuggestionItem[]> {
  const events = await TopicService.getTopicsByTitle(query)

  return new Promise((resolve) => {
    resolve(events.map((topic) => ({
      title: topic.title,
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
    })))
  })
}
