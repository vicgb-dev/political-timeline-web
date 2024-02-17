import { Text, Avatar, Box, Button, Checkbox, Flex, IconButton, Popover, TextArea, Heading, Code } from '@radix-ui/themes'
import { Search } from '../search/search'
import './header.css'
import { ChatBubbleIcon, InfoCircledIcon, PersonIcon } from '@radix-ui/react-icons'

export function Header () {
  const toggleButtonsExpand = () => {
    console.log('toggleButtonsExpand')
  }

  return (
    <div className='header'>
      <div className='search-bar'>
        <Popover.Root>
          <Popover.Trigger>
            <IconButton variant='solid' size='2' >
              <InfoCircledIcon />
            </IconButton>
          </Popover.Trigger>
          <Popover.Content >
            <Flex direction='column' gap='2'>
              <Heading>Búsquedas especiales</Heading>
              <div>
                <Text>Separadas por comas:</Text>
                <ul style={{ marginTop: '5px' }}>
                  <li>
                    <Text><Code>@</Code>: figuras publicas</Text>
                  </li>
                  <li>
                    <Text><Code>e[ ]</Code>: otro evento</Text>
                  </li>
                  <li>
                    <Text><Code>t[ ]</Code>: un topic</Text>
                  </li>
                  <li>
                    <Text><Code>#</Code>: una etiqueta</Text>
                  </li>
                </ul>
              </div>
              <Popover.Close>
                <Button size="1">Cerrar</Button>
              </Popover.Close>
            </Flex>
          </Popover.Content>
        </Popover.Root>

        <Search />
        <IconButton variant='solid' size='2' onClick={toggleButtonsExpand} >
          <PersonIcon />
        </IconButton>
      </div>
    </div>
  )
}
