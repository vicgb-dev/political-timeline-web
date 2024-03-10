import { InfoCircledIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { Code, Flex, Heading, IconButton, Popover, Text } from '@radix-ui/themes'

export function SearchBarInfoButton () {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant='surface' size='2' className='relative' >
          <InfoCircledIcon />
          <TriangleDownIcon className='absolute ml-12' />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content >
        <Flex direction='column' gap='2'>
          <Heading>Búsquedas especiales</Heading>
          <div>
            <Text>Separadas por comas:</Text>
            <ul style={{ marginTop: '5px' }}>
              <li>
                <Text><Code>@</Code>: figuras públicas</Text>
              </li>
              <li>
                <Text><Code>e[ ]</Code>: otro evento</Text>
              </li>
              <li>
                <Text><Code>t[ ]</Code>: un tema</Text>
              </li>
              <li>
                <Text><Code>#</Code>: una etiqueta</Text>
              </li>
            </ul>
          </div>
        </Flex>
      </Popover.Content>
    </Popover.Root>

  )
}
