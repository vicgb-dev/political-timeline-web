import { createReactInlineContentSpec } from '@blocknote/react'
import { Button, Popover } from '@radix-ui/themes'
import { DashboardIcon } from '@radix-ui/react-icons'
import { ToastProps, useToast } from '../../../stores/toast-store'
import { notImplementedToastProps } from '../../../constants/mocks/not-implemented-toast'

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
        t:{props.inlineContent.props.topic}</span>
          </Popover.Trigger>
          <Popover.Content >
            <Button variant='soft' size='2' className='relative' onClick={showNotImplementedToast}>
              <DashboardIcon />
        Ir al artículo de {props.inlineContent.props.topic}
            </Button>
          </Popover.Content>
        </Popover.Root>
      )
    }
  }
)
