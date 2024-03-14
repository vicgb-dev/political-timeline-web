import { TrashIcon } from '@radix-ui/react-icons'
import { ScrollArea, Text, IconButton, Link } from '@radix-ui/themes'
import { AllowedTypes } from '../../types/allowed-types'

interface SelectedResourceListProps {
  selectedData: AllowedTypes[]
  getTitle: (data: AllowedTypes) => string
  getSubtitle: (data: AllowedTypes) => string
  toggleData: (e: any, data: AllowedTypes) => void
  isLink?: boolean
}

export function SelectedResourceList ({ props }: { props: SelectedResourceListProps }) {
  return (
    <ScrollArea scrollbars='vertical'>
      <div className='flex flex-col py-3 pr-1 gap-3'>
        {props.selectedData.map(data => (
          <div key={data.id} className='flex flex-row justify-between items-center gap-3'>
            <div className='flex flex-col justify-between'>
              {props.isLink
                ? <Link size='2' href={props.getTitle(data)} target='_blank' className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                  {props.getTitle(data)}
                </Link>
                : <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                  {props.getTitle(data)}
                </Text>}
              <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                {props.getSubtitle(data)}
              </Text>
            </div>
            <IconButton variant='ghost' onClick={(e) => props.toggleData(e, data)}>
              <TrashIcon color='tomato' />
            </IconButton>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
