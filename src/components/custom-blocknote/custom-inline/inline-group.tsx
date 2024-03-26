import { createReactInlineContentSpec } from '@blocknote/react'
import { Button, Popover } from '@radix-ui/themes'
import { IdCardIcon } from '@radix-ui/react-icons'
import { ToastProps, useToast } from '../../../stores/toast-store'
import { notImplementedToastProps } from '../../../constants/mocks/not-implemented-toast'

export const Group = createReactInlineContentSpec(
  {
    type: 'group',
    propSchema: {
      group: {
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
        |{props.inlineContent.props.group}</span>
          </Popover.Trigger>
          <Popover.Content >
            <Button variant='soft' size='2' className='relative' onClick={showNotImplementedToast}>
              <IdCardIcon />
        Ir al artículo de {props.inlineContent.props.group}
            </Button>
          </Popover.Content>
        </Popover.Root>
      )
    }
  }
)
