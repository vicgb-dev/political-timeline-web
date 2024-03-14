import { Text, Button, Checkbox, RadioGroup } from '@radix-ui/themes'
import { AllowedTypes } from '../../types/allowed-types'

interface LoadedResourceListProps {
  loadedData: AllowedTypes[] | undefined
  selectedData: AllowedTypes[]
  multiSelect: boolean
  getTitle: (data: AllowedTypes) => string
  getSubtitle: (data: AllowedTypes) => string
  toggleData: (e: any, data: AllowedTypes) => void
}

export function LoadedResourceList ({ props }: { props: LoadedResourceListProps }) {
  return (
    <div className='flex flex-col max-h-48 py-3 px-5 gap-3'>
      {props.loadedData?.map(data => (
        <Button key={data.id} variant='ghost' onClick={(e) => props.toggleData(e, data)}>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-col flex-1'>
              <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-96'>
                {props.getTitle(data)}
              </Text>
              <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-96'>
                {props.getSubtitle(data)}
              </Text>
            </div>
            {props.multiSelect
              ? <Checkbox checked={!!props.selectedData.find(t => t.id === data.id) } defaultChecked />
              : <RadioGroup.Root defaultValue="1">
                <RadioGroup.Item checked={!!props.selectedData.find(t => t.id === data.id) } value={`${data.id}`} />
              </RadioGroup.Root>}
          </div>
        </Button>
      ))}
    </div>
  )
}
