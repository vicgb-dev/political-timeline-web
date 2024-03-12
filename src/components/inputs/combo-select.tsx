import { CrumpledPaperIcon, MagnifyingGlassIcon, MinusCircledIcon, MinusIcon, PlusCircledIcon, TrashIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { ScrollArea, TextField, Text, Button, Checkbox, Popover, Card, IconButton, RadioGroupItem, RadioGroup } from '@radix-ui/themes'
import { TopicService } from '../../services/topic-service'
import { useEffect, useState } from 'react'
import { Topic } from '../../models/topic.interface'
import './combo-select.css'

export interface ComboSelectProps {
  multiSelect?: boolean
  buttonTitle: string
}

export function ComboSelect ({ props }: {props: ComboSelectProps}) {
  const [loadedTopics, setLoadedTopics] = useState<Topic[] | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])

  async function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value)

    if (event.target.value.length > 2) {
      // Pedir temas que contengan esas letras
      console.log('Pedir temas que contengan esas letras')
      const foundTopics = await TopicService.getTopicsByTitle(event.target.value)
      setLoadedTopics(foundTopics)
    }
  }

  function toggleTopic (e: any, topic: Topic) {
    e.preventDefault()
    if (props.multiSelect) {
      if (selectedTopics.find(t => t.id === topic.id)) {
        setSelectedTopics(selectedTopics.filter(t => t.id !== topic.id))
      } else {
        setSelectedTopics([...selectedTopics, topic])
      }
    } else {
      if (selectedTopics.find(t => t.id === topic.id)) {
        setSelectedTopics([])
      } else {
        setSelectedTopics([topic])
      }
    }
  }

  return (
    <div className='flex flex-col relative'>
      {(selectedTopics.length === 0 || true) &&
      <Popover.Root>
        <Popover.Trigger>
          <Button variant='outline'>
            <Text>{props.buttonTitle}</Text>
            <TriangleDownIcon />
          </Button>
        </Popover.Trigger>

        <Popover.Content>
          <TextField.Root >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input onChange={handleChange} placeholder="Tema del evento..." />
          </TextField.Root>
          <ScrollArea className='pt-1'>
            <div className='flex flex-col max-h-48 py-3 px-5 gap-3'>
              {loadedTopics?.map(topic => (
                <Button key={topic.id} variant='ghost' onClick={(e) => toggleTopic(e, topic)}>
                  <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col flex-1'>
                      <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                        {topic.title}
                      </Text>
                      <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                        {topic.article}
                      </Text>
                    </div>
                    {props.multiSelect
                      ? <Checkbox checked={!!selectedTopics.find(t => t.id === topic.id) } defaultChecked />
                      : <RadioGroup.Root defaultValue="1">
                        <RadioGroup.Item checked={!!selectedTopics.find(t => t.id === topic.id) } value={`${topic.id}`} />
                      </RadioGroup.Root>}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>}

      {selectedTopics.length > 0 && (
        <ScrollArea className='max-h-28'>
          <div className='flex flex-col max-h-48 py-3 px-5 gap-3'>
            {selectedTopics.map(topic => (
              <div key={topic.id} className='flex flex-row justify-between items-center'>
                <div className='flex flex-col justify-between'>
                  <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                    {topic.title}
                  </Text>
                  <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                    {topic.article}
                  </Text>
                </div>
                <IconButton variant='ghost' onClick={(e) => toggleTopic(e, topic)}>
                  <TrashIcon color='tomato' />
                </IconButton>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
/*
  return (
    <div tabIndex={0} onFocus={handleOnFocus} onBlur={(e) => handleOnBlur(e)} className='relative'>
      <TextField.Root >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input onChange={handleChange} placeholder="Tema del evento..." />
      </TextField.Root>

      {searchBoxOpen &&
      <div className='absolute w-full z-10 bg-zinc-800 rounded-b-lg border custom-border-color'>
        <ScrollArea className=''>
          <div className='flex flex-col max-h-48 py-3 px-5 gap-3'>
            {topics?.map(topic => (
              <Button key={topic.id} variant='ghost' onClick={(e) => toggleTopic(e, topic)}>
                <div className='w-full flex flex-row justify-between items-center'>
                  <div className='flex flex-col flex-1'>
                    <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                      {topic.title}
                    </Text>
                    <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                      {topic.article}
                    </Text>
                  </div>
                  {selectedTopics.find(t => t.id === topic.id)
                    ? <PlusCircledIcon />
                    : <MinusCircledIcon />}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>}

      {selectedTopics.length > 0 && (
        <div className='flex flex-col gap-3'>
          {selectedTopics.map(topic => (
            <Button key={topic.id} variant='ghost' className='flex flex-row justify-between items-center' onClick={(e) => toggleTopic(e, topic)}>
              <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                {topic.title}
              </Text>
              <MinusCircledIcon />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
} */

/*

  function handleOnFocus (e: React.FocusEvent<HTMLDivElement, Element>) {
    console.log('e', e)
    const targetTagName = (e.target as HTMLElement).tagName.toLowerCase()
    if (searchQuery.length > 2) {
      setSearchBoxOpen(true)
    }
  }

  function handleOnBlur (e: React.FocusEvent<HTMLDivElement, Element>) {
    console.log('e', e)
    const targetTagName = (e.target as HTMLElement).tagName.toLowerCase()
    if (targetTagName === 'input') {
      setSearchBoxOpen(false)
    }
  }

  return (
    <div tabIndex={0} onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} className='relative'>
*/
