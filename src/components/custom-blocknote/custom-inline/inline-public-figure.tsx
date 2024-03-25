import { DefaultReactSuggestionItem, createReactInlineContentSpec } from '@blocknote/react'
import { schema } from '../custom-blocknote'
import { PublicFigureService } from '../../../services/public-figure-service'
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

export async function getPublicFigureMenuItems (
  editor: typeof schema.BlockNoteEditor,
  query: string
): Promise<DefaultReactSuggestionItem[]> {
  const publicFigures = await PublicFigureService.getPublicFiguresByName(query)

  return new Promise((resolve) => {
    resolve(publicFigures.map((publicFigure) => ({
      title: publicFigure.first_name + ' ' + publicFigure.last_name,
      onItemClick: () => {
        editor.insertInlineContent([
          {
            type: 'publicFigure',
            props: {
              publicFigure: publicFigure.first_name + ' ' + publicFigure.last_name
            }
          },
          ' ' // add a space after
        ])
      }
    })))
  })
}
