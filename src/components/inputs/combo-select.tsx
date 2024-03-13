import { MagnifyingGlassIcon, TrashIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { ScrollArea, TextField, Text, Button, Checkbox, Popover, IconButton, RadioGroup } from '@radix-ui/themes'
import { TopicService } from '../../services/topic-service'
import { useState } from 'react'
import { Topic } from '../../models/topic.interface'
import './combo-select.css'
import { PoliticalEvent } from '../../models/political-event.interface'
import { Group } from '../../models/group.interface'
import { EventsService } from '../../services/events-service'
import { GroupServices } from '../../services/group-services'
import { PublicFigure } from '../../models/public-figure.interface'
import { PublicFigureService } from '../../services/public-figure-service'

// Cada tipo permitido debe tener un id
type AllowedTypes = Topic | PoliticalEvent | Group | PublicFigure

export interface ComboSelectProps {
  type: 'Topic' | 'PoliticalEvent' | 'Group' | 'PublicFigure'
  multiSelect: boolean
  buttonTitle: string
}

export function ComboSelect<T extends AllowedTypes> ({ props }: { props: ComboSelectProps }) {
  const [loadedData, setLoadedData] = useState<T[] | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedData, setSelectedData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)

  async function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value)

    if (event.target.value.length > 1) {
      // Pedir temas que contengan esas letras
      console.log('Pedir temas que contengan esas letras')

      setLoading(true)

      switch (props.type) {
      case 'Topic':{
        const foundTopics = await TopicService.getTopicsByTitle(event.target.value)
        setLoadedData(foundTopics as T[])
      }
        break
      case 'PoliticalEvent': {
        const foundPoliticalEvent = await EventsService.searchEventsWithQuery(event.target.value)
        setLoadedData(foundPoliticalEvent as T[])
      }
        break
      case 'Group':{
        const foundGroup = await GroupServices.getGroupsByName(event.target.value)
        setLoadedData(foundGroup as T[])
      }
        break
      case 'PublicFigure':{
        const foundGroup = await PublicFigureService.getPublicFiguresByName(event.target.value)
        setLoadedData(foundGroup as T[])
      }
      }

      setLoading(false)
    }
  }

  function toggleData (e: any, data: T) {
    e.preventDefault()
    if (props.multiSelect) {
      if (selectedData.find(t => t.id === data.id)) {
        setSelectedData(selectedData.filter(t => t.id !== data.id))
      } else {
        setSelectedData([...selectedData as T[], data as T])
      }
    } else {
      if (selectedData.find(t => t.id === data.id)) {
        setSelectedData([])
      } else {
        setSelectedData([data])
      }
    }
  }

  function getTitle (data: AllowedTypes) {
    switch (props.type) {
    case 'Topic':
      return (data as Topic).title
    case 'PoliticalEvent':
      return (data as PoliticalEvent).title
    case 'Group':
      return (data as Group).name
    case 'PublicFigure':
      return (data as PublicFigure).first_name
    }
  }

  function getSubtitle (data: AllowedTypes) {
    switch (props.type) {
    case 'Topic':
      return (data as Topic).article
    case 'PoliticalEvent':
      return (data as PoliticalEvent).summary
    case 'Group':
      return (data as Group).acronym
    case 'PublicFigure':
      return (data as PublicFigure).last_name
    }
  }

  return (
    <div className={` relative ${selectedData.length > 0 ? 'px-2 py-2' : ''}`}>
      {(selectedData.length === 0 || true) &&
      <Popover.Root>
        <Popover.Trigger>
          <Button
            className='relative'
            highContrast={selectedData.length > 0}
            variant={`${selectedData.length > 0 ? 'ghost' : 'outline'}`}>
            <Text>{props.buttonTitle}</Text>
            <TriangleDownIcon />
          </Button>
        </Popover.Trigger>

        <Popover.Content className='w-full'>
          <TextField.Root >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input onChange={handleChange} placeholder="Tema del evento..." />
            {loading &&
              <div className='loading-bar'/>
            }
          </TextField.Root>
          <ScrollArea className='pt-1'>
            <div className='flex flex-col max-h-48 py-3 px-5 gap-3'>
              {loadedData?.map(data => (
                <Button key={data.id} variant='ghost' onClick={(e) => toggleData(e, data)}>
                  <div className='w-full flex flex-row justify-between items-center'>
                    <div className='flex flex-col flex-1'>
                      <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-96'>
                        {getTitle(data)}
                      </Text>
                      <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-96'>
                        {getSubtitle(data)}
                      </Text>
                    </div>
                    {props.multiSelect
                      ? <Checkbox checked={!!selectedData.find(t => t.id === data.id) } defaultChecked />
                      : <RadioGroup.Root defaultValue="1">
                        <RadioGroup.Item checked={!!selectedData.find(t => t.id === data.id) } value={`${data.id}`} />
                      </RadioGroup.Root>}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>}

      <div className=''>
        {selectedData.length > 0 && (
          <ScrollArea className=''>
            <div className='flex flex-col py-3 px-5 gap-3'>
              {selectedData.map(data => (
                <div key={data.id} className='flex flex-row justify-between items-center'>
                  <div className='flex flex-col justify-between'>
                    <Text size="2" weight="bold" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                      {getTitle(data)}
                    </Text>
                    <Text size="2" color="gray" className='whitespace-nowrap overflow-hidden text-ellipsis max-w-56'>
                      {getSubtitle(data)}
                    </Text>
                  </div>
                  <IconButton variant='ghost' onClick={(e) => toggleData(e, data)}>
                    <TrashIcon color='tomato' />
                  </IconButton>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
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
