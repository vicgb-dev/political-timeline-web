import { Box, Button, Card, Flex, Heading, IconButton, Link, Text } from '@radix-ui/themes'
import { ArchiveIcon, DotsVerticalIcon, DropdownMenuIcon, PersonIcon, Share1Icon } from '@radix-ui/react-icons'
import { ALIGN } from '../../../constants/enums'
import { CalendarLineEvent } from '../eventsDeco/calendar-line-event'
import '../event.css'

interface EventSkeletonProps {
  column: ALIGN
  oneColumn: boolean
}

export function EventSSkeleton ({ props }: { props: EventSkeletonProps }) {
  const isLeft = props.oneColumn ? props.oneColumn : props.column === ALIGN.LEFT

  return (
    <Box className={
      `event-card-S min-h-52
      ${isLeft ? 'isLeft' : 'isRight'} 
      ${props.oneColumn ? 'one-column' : 'two-columns'}`
    } >
      <CalendarLineEvent props={{ align: isLeft ? ALIGN.LEFT : ALIGN.RIGHT, oneColumn: props.oneColumn }} />
      {/* Por encima */}
      <Flex gap="3" justify='between' className={`${isLeft ? 'flex-row' : 'flex-row-reverse'} min-h-5`}>
        <Text size='2'></Text>
      </Flex>
      <Card size="3" className='event-blur no-selected' >
        {/* Titulo */}
        <Button
          highContrast
          className='w-full mb-5 min-h-20'
          variant='ghost'
          size='2'
        >
          <Flex gap="3" align="start" direction="column" width='100%'>
            <Heading size="6">
            </Heading>
            <Text className='short-description'>
            </Text>
          </Flex>
        </Button>
        {/* Botones */}
        <Flex gap="4" pt='4' align="center">
          <IconButton variant='ghost' size='2' >
            <DotsVerticalIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' >
            <PersonIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' >
            <ArchiveIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' >
            <DropdownMenuIcon />
          </IconButton>
          <IconButton variant='ghost' size='2' >
            <Share1Icon />
          </IconButton>
        </Flex>
      </Card>
    </Box>
    // </div>
  )
}
