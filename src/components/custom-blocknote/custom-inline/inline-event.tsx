import { DefaultReactSuggestionItem, createReactInlineContentSpec } from '@blocknote/react'
import { schema } from '../custom-blocknote'
import { EventsService } from '../../../services/events-service'
import { Button, Popover } from '@radix-ui/themes'
import { CalendarIcon } from '@radix-ui/react-icons'
import { ToastProps, useToast } from '../../../stores/toast-store'
import { notImplementedToastProps } from '../../../constants/mocks/not-implemented-toast'

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
    render: (props) => {
      const addToast = useToast(state => state.addToast)

      function showNotImplementedToast () {
        const toast: ToastProps = notImplementedToastProps
        addToast(toast, true)
      }
      return (
        <Popover.Root>
          <Popover.Trigger>
            <span className='bg-[color:var(--accent-5)]'>
        e{'{'}{props.inlineContent.props.politicalEvent}{'}'}
            </span>
          </Popover.Trigger>
          <Popover.Content >
            <Button variant='soft' size='2' className='relative' onClick={showNotImplementedToast}>
              <CalendarIcon />
        Ir al artículo de e{'{'}{props.inlineContent.props.politicalEvent}{'}'}
            </Button>
          </Popover.Content>
        </Popover.Root>
      )
    }
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
