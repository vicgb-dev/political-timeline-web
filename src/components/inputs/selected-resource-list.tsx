import { TrashIcon } from '@radix-ui/react-icons'
import { ScrollArea, Text, IconButton } from '@radix-ui/themes'
import { AllowedTypes } from '../../types/allowed-types'

interface SelectedResourceListProps {
  selectedData: AllowedTypes[]
  getTitle: (data: AllowedTypes) => string
  getSubtitle: (data: AllowedTypes) => string
  toggleData: (e: any, data: AllowedTypes) => void
}

export function SelectedResourceList ({ props }: { props: SelectedResourceListProps }) {
  return (
    <ScrollArea scrollbars='vertical'>
      <div className='flex flex-col py-3 pr-1 gap-3'>
        {props.selectedData.map(data => (
          <div key={data.id} className='flex flex-row justify-between items-center'>
            <div className='flex flex-col justify-between'>
              <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                {props.getTitle(data)}
              </Text>
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
