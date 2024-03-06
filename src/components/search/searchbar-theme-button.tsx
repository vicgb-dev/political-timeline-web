import { BlendingModeIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Flex, Grid, Heading, IconButton, Popover, useThemeContext } from '@radix-ui/themes'
import { useEffect } from 'react'

export function SearchBarThemeButton () {
  const { onAccentColorChange } = useThemeContext()

  useEffect(() => {
    const newColor = localStorage.getItem('accentColor')
    onAccentColorChange(newColor as any || 'orange')
  }, [])

  function changeColor (color: any) {
    localStorage.setItem('accentColor', color)
    onAccentColorChange(color)
  }
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant='surface' size='2' >
          <BlendingModeIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content >
        <Flex direction='column' gap='2'>
          <Heading>Elige un color</Heading>
          <Grid columns='5' gap='2' justify='center'>
            <IconButton onClick={() => changeColor('tomato')} color='tomato' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('red')} color='red' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('ruby')} color='ruby' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('crimson')} color='crimson' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('pink')} color='pink' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('plum')} color='plum' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('purple')} color='purple' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('violet')} color='violet' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('iris')} color='iris' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('indigo')} color='indigo' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('blue')} color='blue' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('cyan')} color='cyan' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('teal')} color='teal' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('jade')} color='jade' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('green')} color='green' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('grass')} color='grass' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('bronze')} color='bronze' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('gold')} color='gold' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('brown')} color='brown' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('orange')} color='orange' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('amber')} color='amber' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('yellow')} color='yellow' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('lime')} color='lime' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('mint')} color='mint' variant='solid' size='2' />
            <IconButton onClick={() => changeColor('sky')} color='sky' variant='solid' size='2' />
          </Grid>
        </Flex>
      </Popover.Content>
    </Popover.Root>

  )
}
