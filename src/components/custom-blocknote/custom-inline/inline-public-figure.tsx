import { DefaultReactSuggestionItem, createReactInlineContentSpec } from '@blocknote/react'
import { schema } from '../custom-blocknote'
import { PublicFigureService } from '../../../services/public-figure-service'

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
    render: (props) => (
      <span className='bg-[color:var(--accent-5)]'>
        @{props.inlineContent.props.publicFigure}
      </span>
    )
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
