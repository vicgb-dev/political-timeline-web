import { createReactInlineContentSpec } from '@blocknote/react'
import { Button, Popover } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { ToastProps, useToast } from '../../../stores/toast-store'
import { notImplementedToastProps } from '../../../constants/mocks/not-implemented-toast'

export const PublicFigure = createReactInlineContentSpec(
  {
    type: 'publicFigure',
    propSchema: {
      publicFigure: {
        default: 'Unknown'
      },
      id: {
        default: 0
      },
      description: {
        default: 'Unknown'
      }
    },
    content: 'none'
  },
  {
    render: (props) => {
      const addToast = useToast(state => state.addToast)

      function showNotImplementedToast () {
        console.log('PublicFigure',
          props.inlineContent.props.publicFigure,
          props.inlineContent.props.id,
          props.inlineContent.props.description)
        const toast: ToastProps = notImplementedToastProps
        addToast(toast, true)
      }
      return (
        <Popover.Root>
          <Popover.Trigger>
            <span className='bg-[color:var(--accent-5)]'>
        @{props.inlineContent.props.publicFigure}</span>
          </Popover.Trigger>
          <Popover.Content >
            <Button variant='soft' size='2' className='relative' onClick={showNotImplementedToast}>
              <PersonIcon />
        Ir al artículo de {props.inlineContent.props.publicFigure}
            </Button>
          </Popover.Content>
        </Popover.Root>)
    }
  }
)
